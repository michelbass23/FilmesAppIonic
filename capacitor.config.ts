import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Filmes',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    CapacitorHttp:{
      enabled:true,
    }
  }
};

export default config;
