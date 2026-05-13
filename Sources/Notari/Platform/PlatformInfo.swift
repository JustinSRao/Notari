import Foundation
#if canImport(UIKit)
import UIKit
#endif

enum PlatformInfo {
    static var currentPlatformName: String {
        #if os(macOS)
        return "macOS"
        #elseif os(iOS)
        if UIDevice.current.userInterfaceIdiom == .pad {
            return "iPadOS"
        }
        return "iOS"
        #else
        return "unknown"
        #endif
    }
}
