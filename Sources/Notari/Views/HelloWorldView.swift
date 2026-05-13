import SwiftUI

struct HelloWorldView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Notari")
                .font(.notariWordmark)
            Text(versionString)
                .font(.notariBody)
                .foregroundStyle(.secondary)
            Text(PlatformInfo.currentPlatformName)
                .font(.notariBody)
                .foregroundStyle(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var versionString: String {
        let info = Bundle.main.infoDictionary
        let short = info?["CFBundleShortVersionString"] as? String ?? "0.0.0"
        let build = info?["CFBundleVersion"] as? String ?? "0"
        return "v\(short) (\(build))"
    }
}

#Preview {
    HelloWorldView()
}
