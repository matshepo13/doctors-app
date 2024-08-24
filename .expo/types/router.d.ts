/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(authenticated)` | `/(authenticated)/id-entry` | `/(authenticated)/userService` | `/(login)` | `/(login)/login` | `/(login)/loginstyle` | `/(login)/signup` | `/(tabs)` | `/(tabs)/two` | `/_sitemap` | `/id-entry` | `/login` | `/loginstyle` | `/modal` | `/pages/appointments` | `/signup` | `/two` | `/userService`;
      DynamicRoutes: `/(authenticated)/user-details/${Router.SingleRoutePart<T>}` | `/user-details/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(authenticated)/user-details/[id]` | `/user-details/[id]`;
    }
  }
}
