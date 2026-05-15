<?php
declare(strict_types=1);

// Coingecko SDK base feature

class CoingeckoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CoingeckoContext $ctx, array $options): void {}
    public function PostConstruct(CoingeckoContext $ctx): void {}
    public function PostConstructEntity(CoingeckoContext $ctx): void {}
    public function SetData(CoingeckoContext $ctx): void {}
    public function GetData(CoingeckoContext $ctx): void {}
    public function GetMatch(CoingeckoContext $ctx): void {}
    public function SetMatch(CoingeckoContext $ctx): void {}
    public function PrePoint(CoingeckoContext $ctx): void {}
    public function PreSpec(CoingeckoContext $ctx): void {}
    public function PreRequest(CoingeckoContext $ctx): void {}
    public function PreResponse(CoingeckoContext $ctx): void {}
    public function PreResult(CoingeckoContext $ctx): void {}
    public function PreDone(CoingeckoContext $ctx): void {}
    public function PreUnexpected(CoingeckoContext $ctx): void {}
}
