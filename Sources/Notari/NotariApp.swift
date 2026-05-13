import SwiftUI

@main
struct NotariApp: App {
    var body: some Scene {
        WindowGroup {
            HelloWorldView()
        }
        #if os(macOS)
        .defaultSize(width: 480, height: 360)
        #endif
    }
}
