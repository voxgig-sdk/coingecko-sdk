<?php
declare(strict_types=1);

// Simple entity test

require_once __DIR__ . '/../coingecko_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SimpleEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CoingeckoSDK::test(null, null);
        $ent = $testsdk->Simple(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = simple_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "simple." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set COINGECKO_TEST_SIMPLE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $simple_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.simple")));
        $simple_ref01_data = null;
        if (count($simple_ref01_data_raw) > 0) {
            $simple_ref01_data = Helpers::to_map($simple_ref01_data_raw[0][1]);
        }

        // LOAD
        $simple_ref01_ent = $client->Simple(null);
        $simple_ref01_match_dt0 = [];
        [$simple_ref01_data_dt0_loaded, $err] = $simple_ref01_ent->load($simple_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($simple_ref01_data_dt0_loaded);

    }
}

function simple_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/simple/SimpleTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CoingeckoSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["simple01", "simple02", "simple03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("COINGECKO_TEST_SIMPLE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COINGECKO_TEST_SIMPLE_ENTID" => $idmap,
        "COINGECKO_TEST_LIVE" => "FALSE",
        "COINGECKO_TEST_EXPLAIN" => "FALSE",
        "COINGECKO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COINGECKO_TEST_SIMPLE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["COINGECKO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["COINGECKO_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CoingeckoSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["COINGECKO_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["COINGECKO_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
