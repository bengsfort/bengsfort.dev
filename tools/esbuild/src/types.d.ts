import esbuild from 'esbuild';

interface BuildSettings {
  name: string;
  watchMode?: boolean;
}
export function build(options: esbuild.BuildOptions, settings?: BuildSettings): Promise<esbuild.BuildResult>;
