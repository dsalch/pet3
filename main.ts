let NewVisitor = 0
function doGreeting () {
    basic.showIcon(IconNames.Heart)
    if (NewVisitor == 0) {
        music.play(music.stringPlayable("C5 C5 G G G G - - ", 400), music.PlaybackMode.InBackground)
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 40)
        for (let index = 0; index < 3; index++) {
            mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.Blue)
            basic.pause(200)
            mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.OFF)
            basic.pause(100)
        }
        mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
        NewVisitor = 1
        basic.showIcon(IconNames.SmallHeart)
    } else {
        basic.clearScreen()
        mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.OFF)
    }
}
function goTilted () {
    music.play(music.stringPlayable("C5 A B G A F G E ", 400), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.SmallSquare)
    basic.clearScreen()
}
function doScared () {
    basic.showIcon(IconNames.Surprised)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground)
    mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.Red)
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Back, 100)
    basic.pause(500)
    mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.OFF)
    basic.clearScreen()
}
basic.forever(function () {
    if (mbit_Robot.Ultrasonic_Car() < 30) {
        doGreeting()
    } else {
        NewVisitor = 0
    }
    if (mbit_Robot.Avoid_Sensor(mbit_Robot.enAvoidState.OBSTACLE)) {
        doScared()
    }
    if (Math.abs(input.acceleration(Dimension.X)) > 300 || Math.abs(input.acceleration(Dimension.Z)) > 300) {
        goTilted()
    }
})
