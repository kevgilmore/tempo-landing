import { useState, useEffect } from 'react';

interface ReleaseAsset {
    name: string;
    browser_download_url: string;
}

interface ReleaseData {
    tag_name: string;
    assets: ReleaseAsset[];
}

interface UseLatestReleaseReturn {
    x64Url: string;
    arm64Url: string;
    version: string;
    isLoading: boolean;
    error: Error | null;
}

// Fallback constants if the API call fails
const DEFAULT_VERSION = '0.1.25';
const FALLBACK_X64 = `https://github.com/kevgilmore/tempo-app/releases/download/v0.1.25-build.6/Tempo_0.1.25_x64-setup.exe`;
const FALLBACK_ARM64 = `https://github.com/kevgilmore/tempo-app/releases/download/v0.1.25-build.6/Tempo_0.1.25_arm64-setup.exe`;

export const useLatestRelease = (): UseLatestReleaseReturn => {
    const [data, setData] = useState<UseLatestReleaseReturn>({
        x64Url: FALLBACK_X64,
        arm64Url: FALLBACK_ARM64,
        version: DEFAULT_VERSION,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchRelease = async () => {
            try {
                const response = await fetch(
                    'https://api.github.com/repos/kevgilmore/tempo-app/releases/latest'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch latest release');
                }

                const json: ReleaseData = await response.json();

                const x64Asset = json.assets.find(asset =>
                    asset.name.includes('x64') && asset.name.endsWith('.exe')
                );
                const arm64Asset = json.assets.find(asset =>
                    asset.name.includes('arm64') && asset.name.endsWith('.exe')
                );

                setData({
                    x64Url: x64Asset?.browser_download_url || FALLBACK_X64,
                    arm64Url: arm64Asset?.browser_download_url || FALLBACK_ARM64,
                    version: json.tag_name.replace('v', ''),
                    isLoading: false,
                    error: null,
                });
            } catch (err) {
                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    error: err instanceof Error ? err : new Error('Unknown error'),
                }));
            }
        };

        fetchRelease();
    }, []);

    return data;
};
