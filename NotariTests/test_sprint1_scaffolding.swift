import XCTest
import SwiftUI
@testable import Notari

final class Sprint1ScaffoldingTests: XCTestCase {

    func test_bundleIdentifierMatchesPlaceholder() {
        let bundleID = Bundle.main.bundleIdentifier
        XCTAssertEqual(
            bundleID,
            "com.notari.app",
            "Bundle identifier should be the Sprint 1 placeholder until an Apple Developer team ID is assigned."
        )
    }

    func test_platformInfoReturnsNonEmptyName() {
        let name = PlatformInfo.currentPlatformName
        XCTAssertFalse(name.isEmpty, "Platform name must resolve to a non-empty string on every supported OS.")

        let allowed: Set<String> = ["iOS", "iPadOS", "macOS"]
        XCTAssertTrue(
            allowed.contains(name),
            "Platform name '\(name)' must be one of iOS / iPadOS / macOS."
        )
    }

    func test_helloWorldViewBuildsWithoutCrashing() {
        let view = HelloWorldView()
        let host = TestHost(content: view)
        XCTAssertNotNil(host.body, "HelloWorldView should produce a body without crashing.")
    }
}

private struct TestHost<Content: View>: View {
    let content: Content
    var body: some View { content }
}
