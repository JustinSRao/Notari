import SwiftUI

extension Font {
    static var notariWordmark: Font {
        .custom("InstrumentSerif-Regular", size: 72, relativeTo: .largeTitle)
    }

    static func instrumentSerif(size: CGFloat, relativeTo style: Font.TextStyle = .body) -> Font {
        .custom("InstrumentSerif-Regular", size: size, relativeTo: style)
    }

    static var notariBody: Font {
        .custom("IBMPlexSans-Regular", size: 16, relativeTo: .body)
    }

    static func ibmPlexSans(size: CGFloat, relativeTo style: Font.TextStyle = .body) -> Font {
        .custom("IBMPlexSans-Regular", size: size, relativeTo: style)
    }
}
