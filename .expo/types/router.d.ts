/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/new-password` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(auth)/verify` | `/(tabs)` | `/(tabs)/cart` | `/(tabs)/home` | `/(tabs)/profile` | `/(tabs)/recipes` | `/(tabs)/seach` | `/..\components\custom\ExternalLink` | `/_sitemap` | `/cart` | `/home` | `/new-password` | `/profile` | `/recipes` | `/seach` | `/sign-in` | `/sign-up` | `/verify`;
      DynamicRoutes: `/search/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/search/[quary]`;
    }
  }
}
