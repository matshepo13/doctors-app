/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(authenticated)` | `/(authenticated)/id-entry` | `/(authenticated)/resultsdisplay` | `/(authenticated)/userService` | `/(login)` | `/(login)/login` | `/(login)/loginstyle` | `/(login)/signup` | `/(tabs)` | `/(tabs)/two` | `/_sitemap` | `/id-entry` | `/login` | `/loginstyle` | `/modal` | `/pages/appointments` | `/resultsdisplay` | `/signup` | `/two` | `/userService`;
      DynamicRoutes: `/(authenticated)/patient-details/${Router.SingleRoutePart<T>}` | `/(authenticated)/user-details/${Router.SingleRoutePart<T>}` | `/patient-details/${Router.SingleRoutePart<T>}` | `/user-details/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(authenticated)/patient-details/[id]` | `/(authenticated)/user-details/[id]` | `/patient-details/[id]` | `/user-details/[id]`;
    }
  }
}
