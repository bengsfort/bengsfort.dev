import esbuild from 'esbuild';

interface BuildSettings {
  name: string;
  isWatch?: boolean;
  isUI?: boolean;
}
export function build(options: esbuild.BuildOptions, settings?: BuildSettings): Promise<esbuild.BuildResult>;
