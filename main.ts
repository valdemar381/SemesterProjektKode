namespace SpriteKind {
    export const Utility = SpriteKind.create()
}



let ArrowSelector: Sprite = null
let NumberToText = ""
let MenuTileMap: tiles.TileMapData = null
let MainTileMap: tiles.TileMapData = null
let CurrentDay = 0
let Gang: number[] = []
let Køkken: number[] = []
let Badeværelse: number[] = []
let Soveværelse: number[] = []
let Stue: number[] = []
let MainCharacter: Sprite = null
let Time = 1
let CurrentTileMap = ""
let Money = 0
let MainCharacterPosCol = 0
let MainCharacterPosRow = 0
MainCharacterPosRow = 27
MainCharacterPosCol = 13
Money = 10000
CurrentTileMap = "Main"
let CurrentTime = 13
let HourDurationMs = 5000
let LightSwitchDelay = 0

let CurrentEqiupmentInteraction = ""
let OvnTurnedOnTimer = 0
let TørretumblerTurnedOnTimer = 0
let VaskemaskineTurnedOnTimer = 0
let FjernsynTurnedOnTimer = 0
let FøntørrerTurnedOnTimer = 0
let CloneStue: tiles.TileMapData = null
let CloneKøkken: tiles.TileMapData = null
let CloneBadeværelse: tiles.TileMapData = null
let CloneGang: tiles.TileMapData = null
let CloneSoveværelse: tiles.TileMapData = null




SetFunctions()
controller.moveSprite(MainCharacter, 150, 150)
tiles.placeOnTile(MainCharacter, tiles.getTileLocation(MainCharacterPosCol, MainCharacterPosRow))
scene.cameraFollowSprite(MainCharacter)
DefineRooms(Stue, 8, 16, 17, 7)
DefineRooms(Soveværelse, 7, 6, 3, 7)
DefineRooms(Badeværelse, 7, 7, 3, 14)
DefineRooms(Køkken, 13, 4, 3, 2)
DefineRooms(Gang, 5, 11, 11, 7)
let GameIsAcive = true








controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CurrentTileMap == "Main") {
        let CO2 = 0
        tileUtil.loadConnectedMap(MapConnectionKind.Door1)
        SetNumbers(CurrentDay, 1, 1)
        SetNumbers(CO2, 1, 2)
        SetNumbers(Money, 1, 3)
        SetImage("Ur", 0, 1)
        SetImage("CO2", 0, 2)
        SetImage("Money", 0, 3)
        SetUr(Time)
        
        CurrentTileMap = "Menu"
    } else if (CurrentTileMap == "Menu") {
        tileUtil.loadConnectedMap(MapConnectionKind.Door1)
        CurrentTileMap = "Main"
    }
})


controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CurrentEqiupmentInteraction == "Ovn") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnGammelSlukket`)) {
            tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`ovnGammelTændt`)
            CurrentEqiupmentInteraction = ""
        
        }
            
    } else if (CurrentEqiupmentInteraction == "Tørretumbler") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerLowSlukket`)) {
            tiles.setTileAt(tiles.getTileLocation(9, 20), assets.tile`tørretumblerLowTændt`)
            CurrentEqiupmentInteraction = ""
        
        }
            
    } else if (CurrentEqiupmentInteraction == "Vaskemaskine") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineLowSlukket`)) {
            tiles.setTileAt(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineLowTændt`)
            CurrentEqiupmentInteraction = ""
        
        }
            
    } else if (CurrentEqiupmentInteraction == "Fjernsyn") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(21, 17), assets.tile`TV 1`)) {
            tiles.setTileAt(tiles.getTileLocation(21, 17), assets.tile`TV 11`)
            tiles.setTileAt(tiles.getTileLocation(20, 17), assets.tile`TV 12`)
            tiles.setTileAt(tiles.getTileLocation(19, 17), assets.tile`TV 7`)
            tiles.setTileAt(tiles.getTileLocation(20, 16), assets.tile`TV 13`)
            CurrentEqiupmentInteraction = ""
        
        }
    } else if (CurrentEqiupmentInteraction == "Føntørrer") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(6, 14), assets.tile`føntørrerLowSlukket`)) {
            tiles.setTileAt(tiles.getTileLocation(6, 14), assets.tile`føntørrerLowTændt`)
            CurrentEqiupmentInteraction = ""
        
        }
            
    } 
})




function TurnOnEquipment(WhatEquipment: string, MovePlayerCol: number, MovePlayerRow: number, sprite: any) {
    MainCharacterPosCol = tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column)
    MainCharacterPosRow = tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row)
    if (WhatEquipment == "Ovn") {
        CurrentEqiupmentInteraction = WhatEquipment
        game.showLongText("Ovnen skal tændes 1 gang om dagen", DialogLayout.Bottom)
        game.showLongText("Du har haft tændt den " + Time + " gange i dag", DialogLayout.Bottom)
        game.showLongText("Vil du tænde ovnen? - Tryk B", DialogLayout.Bottom)
    }else if (WhatEquipment == "Tørretumbler") {
        CurrentEqiupmentInteraction = WhatEquipment
        game.showLongText("Tørretumbleren skal tændes 1 gang om dagen", DialogLayout.Bottom)
        game.showLongText("Du har haft tændt den " + Time + " gange i dag", DialogLayout.Bottom)
        game.showLongText("Vil du tænde tørretumbleren? - Tryk B", DialogLayout.Bottom)
    }else if (WhatEquipment == "Vaskemaskine") {
        CurrentEqiupmentInteraction = WhatEquipment
        game.showLongText("Vaskemaskinen skal tændes 1 gang om dagen", DialogLayout.Bottom)
        game.showLongText("Du har haft tændt den " + Time + " gange i dag", DialogLayout.Bottom)
        game.showLongText("Vil du tænde vaskemaskinen? - Tryk B", DialogLayout.Bottom)
    }else if (WhatEquipment == "Fjernsyn") {
        CurrentEqiupmentInteraction = WhatEquipment
        game.showLongText("Fjernsynet skal bruges 1 gang om dagen", DialogLayout.Bottom)
        game.showLongText("Du har haft tændt den " + Time + " gange i dag", DialogLayout.Bottom)
        game.showLongText("Vil du tænde fjernsynet? - Tryk B", DialogLayout.Bottom)
    }else if (WhatEquipment == "Føntørrer") {
        CurrentEqiupmentInteraction = WhatEquipment
        game.showLongText("Føntørreren skal bruges 1 gang om dagen", DialogLayout.Bottom)
        game.showLongText("Du har haft tændt den " + Time + " gange i dag", DialogLayout.Bottom)
        game.showLongText("Vil du tænde føntørreren? - Tryk B", DialogLayout.Bottom)
    }
    tiles.placeOnTile(MainCharacter, tiles.getTileLocation(MainCharacterPosCol + MovePlayerCol, MainCharacterPosRow + MovePlayerRow))
}



scene.onOverlapTile(SpriteKind.Player, assets.tile`ovnGammelSlukket`, function (sprite, location) {
    TurnOnEquipment("Ovn", 0, 1, sprite)
    
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`tørretumblerLowSlukket`, function (sprite, location) {
    TurnOnEquipment("Tørretumbler", 0, -1, sprite)
    
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`vaskemaskineLowSlukket`, function (sprite, location) {
    TurnOnEquipment("Vaskemaskine", 0, -1, sprite)
    
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`TV 2`, function (sprite, location) {
    TurnOnEquipment("Fjernsyn", 0, 5, sprite)
    
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`føntørrerLowSlukket`, function (sprite, location) {
    TurnOnEquipment("Føntørrer", 0, 1, sprite)
    
    
})


scene.onOverlapTile(SpriteKind.Player, assets.tile`WallBtnLeft`, function (sprite, location) {
    if (LightSwitchDelay == 0) {
        LightSwitchDelay = 1
        LightSwitch("Stue")
    }
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`WallBtnDown`, function (sprite, location) {
    if (LightSwitchDelay == 0) {
        LightSwitchDelay = 1
        LightSwitch("Køkken")
    }
    
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`WallBtnToilet`, function (sprite, location) {
    if (LightSwitchDelay == 0) {
        LightSwitchDelay = 1
        LightSwitch("Badeværelse")
    }
    
})














sprites.onDestroyed(SpriteKind.Utility, function (sprite) {
    MainCharacter = sprites.create(assets.image`MyGuyJim`, SpriteKind.Player)
    controller.moveSprite(MainCharacter, 150, 150)
    tiles.placeOnTile(MainCharacter, tiles.getTileLocation(MainCharacterPosCol, MainCharacterPosRow))
    scene.cameraFollowSprite(MainCharacter)
})

sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    if (CurrentTileMap != "Menu") {
        ArrowSelector = sprites.create(assets.image`Arrow`, SpriteKind.Utility)
        controller.moveSprite(ArrowSelector, 100, 100)
        tiles.placeOnTile(ArrowSelector, tiles.getTileLocation(4, 4))
    } else {
        ArrowSelector = sprites.create(assets.image`BlankSelector`, SpriteKind.Utility)
        tiles.placeOnTile(ArrowSelector, tiles.getTileLocation(4, 4))
    }
})
























function DefineRooms (RoomToDefine: number[], XCol: number, XRow: number, StartCol: number, StartRow: number) {
    for (let index = 0; index <= XCol - 1; index++) {
        for (let index2 = 0; index2 <= XRow - 1; index2++) {
            RoomToDefine.push(StartCol + index)
            RoomToDefine.push(StartRow + index2)
        }
    }
}
function SetImage (WhatImage: string, Col: number, Row: number) {
    if (WhatImage == "CO2") {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`CO2`)
    } else if (WhatImage == "Money") {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`Money`)
    } else if (WhatImage == "Ur") {
        tiles.setTileAt(tiles.getTileLocation(Col, Row), assets.tile`Ur`)
    }
}


function SetFunctions () {
    MainCharacter = sprites.create(assets.image`MyGuyJim`, SpriteKind.Player)
    MainTileMap = tilemap`level`
    MenuTileMap = tilemap`level2`
    tiles.setCurrentTilemap(MainTileMap)
    tileUtil.connectMaps(MenuTileMap, MainTileMap, MapConnectionKind.Door1)
    Stue = []
    Soveværelse = []
    Badeværelse = []
    Køkken = []
    Gang = []
}
function SetNumbers (num: number, StartCol: number, StartRow: number) {
    let ArrayWithNumbersToSet: string[] = []
    NumberToText = convertToText(num)
    for (let index3 = 0; index3 <= NumberToText.length - 1; index3++) {
        ArrayWithNumbersToSet.push(NumberToText.charAt(index3))
    }
    for (let index4 = 0; index4 <= ArrayWithNumbersToSet.length - 1; index4++) {
        if (ArrayWithNumbersToSet[index4] == "0") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num0`)
        } else if (ArrayWithNumbersToSet[index4] == "1") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num1`)
        } else if (ArrayWithNumbersToSet[index4] == "2") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num2`)
        } else if (ArrayWithNumbersToSet[index4] == "3") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num3`)
        } else if (ArrayWithNumbersToSet[index4] == "4") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num4`)
        } else if (ArrayWithNumbersToSet[index4] == "5") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num5`)
        } else if (ArrayWithNumbersToSet[index4] == "6") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num6`)
        } else if (ArrayWithNumbersToSet[index4] == "7") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num7`)
        } else if (ArrayWithNumbersToSet[index4] == "8") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num8`)
        } else if (ArrayWithNumbersToSet[index4] == "9") {
            tiles.setTileAt(tiles.getTileLocation(StartCol + index4, StartRow), assets.tile`Num9`)
        }
    }
}

function SetUr (Time: number) {
    tiles.setTileAt(tiles.getTileLocation(7, 1), assets.tile`BigClockTL`)
    tiles.setTileAt(tiles.getTileLocation(8, 1), assets.tile`BigClockTM`)
    tiles.setTileAt(tiles.getTileLocation(9, 1), assets.tile`BigClockTR`)
    tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`BigClockML`)
    tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM`)
    tiles.setTileAt(tiles.getTileLocation(9, 2), assets.tile`BigClockMR`)
    tiles.setTileAt(tiles.getTileLocation(7, 3), assets.tile`BigClockBL`)
    tiles.setTileAt(tiles.getTileLocation(8, 3), assets.tile`BigClockBM`)
    tiles.setTileAt(tiles.getTileLocation(9, 3), assets.tile`BigClockBR`)
    if (Time == 1) {
        tiles.setTileAt(tiles.getTileLocation(8, 1), assets.tile`BigClockTM1`)
        tiles.setTileAt(tiles.getTileLocation(9, 1), assets.tile`BigClockTR_KL1`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM1`)
    } else if (Time == 2) {
        tiles.setTileAt(tiles.getTileLocation(9, 2), assets.tile`BigClockMR2`)
        tiles.setTileAt(tiles.getTileLocation(9, 1), assets.tile`BigClockTR_KL2`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM2`)
    } else if (Time == 3) {
        tiles.setTileAt(tiles.getTileLocation(9, 2), assets.tile`BigClockMR3`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM3`)
    } else if (Time == 4) {
        tiles.setTileAt(tiles.getTileLocation(9, 2), assets.tile`BigClockMR4`)
        tiles.setTileAt(tiles.getTileLocation(9, 3), assets.tile`BigClockBR_KL4`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM4`)
    } else if (Time == 5) {
        tiles.setTileAt(tiles.getTileLocation(8, 3), assets.tile`BigClockBM5`)
        tiles.setTileAt(tiles.getTileLocation(9, 3), assets.tile`BigClockBR_KL5`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM5`)
    } else if (Time == 6) {
        tiles.setTileAt(tiles.getTileLocation(8, 3), assets.tile`BigClockBM6`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM6`)
    } else if (Time == 7) {
        tiles.setTileAt(tiles.getTileLocation(8, 3), assets.tile`BigClockBM7`)
        tiles.setTileAt(tiles.getTileLocation(7, 3), assets.tile`BigClockBL_KL7`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM7`)
    } else if (Time == 8) {
        tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`BigClockML8`)
        tiles.setTileAt(tiles.getTileLocation(7, 3), assets.tile`BigClockBL_KL8`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM8`)
    } else if (Time == 9) {
        tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`BigClockML9`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM9`)
    } else if (Time == 10) {
        tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`BigClockML10`)
        tiles.setTileAt(tiles.getTileLocation(7, 1), assets.tile`BigClockTL_KL10`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM10`)
    } else if (Time == 11) {
        tiles.setTileAt(tiles.getTileLocation(8, 1), assets.tile`BigClockTM11`)
        tiles.setTileAt(tiles.getTileLocation(7, 1), assets.tile`BigClockTL_KL11`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM11`)
    } else if (Time == 12) {
        tiles.setTileAt(tiles.getTileLocation(8, 1), assets.tile`BigClockTM12`)
        tiles.setTileAt(tiles.getTileLocation(8, 2), assets.tile`BigClockMM12`)
    }
}




game.onUpdateInterval(200, function () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(9, 7), assets.tile`myTile13`)) {
        MainCharacterPosCol = tiles.locationXY(tiles.locationOfSprite(MainCharacter), tiles.XY.column)
        MainCharacterPosRow = tiles.locationXY(tiles.locationOfSprite(MainCharacter), tiles.XY.row)
        sprites.destroy(MainCharacter)
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(0, 0), sprites.castle.tileGrass1)) {
        sprites.destroy(ArrowSelector)
    }
})



game.onUpdateInterval(HourDurationMs, function () {
    CurrentTime += 1
    if (CurrentTime == 25) {
        CurrentTime = 1
        CurrentDay += 1
    }
    if (CurrentTime > 12) {
        Time = CurrentTime - 12
    } else {
        Time = CurrentTime
    }
    if (CurrentTileMap == "Menu") {
        SetUr(Time)
        SetNumbers(CurrentDay, 1, 1)
    }
    if (CurrentTime == 18) {
        tileUtil.coverAllTiles(sprites.castle.tileGrass1, assets.tile`PinkGrass`)
        tileUtil.coverAllTiles(assets.tile`UdendørsLampe`, assets.tile`UdendørsLampe0`)
        tileUtil.coverAllTiles(assets.tile`FenceRightTCorner`, assets.tile`FenceCornerRightTCorner`)
        tileUtil.coverAllTiles(assets.tile`FenceRightBCorner`, assets.tile`FenceRightBCorner0`)
        tileUtil.coverAllTiles(assets.tile`FenceTopLCorner`, assets.tile`FenceTopLCorner0`)
        tileUtil.coverAllTiles(assets.tile`FenceStraightVandret`, assets.tile`FenceStraightVandret0`)
        tileUtil.coverAllTiles(assets.tile`FenceSraightDown`, assets.tile`FenceSraightDown0`)
        tileUtil.coverAllTiles(assets.tile`FenceStraightDownShort`, assets.tile`FenceStraightDownShort0`)
        color.setColor(3, color.__hsv(255, 255, 75))
    }
    if (CurrentTime == 7) {
        tileUtil.coverAllTiles(sprites.castle.tileGrass1, sprites.castle.tileGrass1)
        tileUtil.coverAllTiles(assets.tile`UdendørsLampe`, assets.tile`UdendørsLampe`)
        tileUtil.coverAllTiles(assets.tile`FenceCornerRightTCorner`, assets.tile`FenceCornerRightTCorner`)
        tileUtil.coverAllTiles(assets.tile`FenceRightBCorner`, assets.tile`FenceRightBCorner`)
        tileUtil.coverAllTiles(assets.tile`FenceTopLCorner`, assets.tile`FenceTopLCorner`)
        tileUtil.coverAllTiles(assets.tile`FenceStraightVandret`, assets.tile`FenceStraightVandret`)
        tileUtil.coverAllTiles(assets.tile`FenceSraightDown`, assets.tile`FenceSraightDown`)
        tileUtil.coverAllTiles(assets.tile`FenceStraightDownShort`, assets.tile`FenceStraightDownShort`)
        color.setPalette(
        color.originalPalette
        )
    }
})



game.onUpdateInterval(1000, function () {

    if (LightSwitchDelay == 2) {
        LightSwitchDelay = 0
    } else if (LightSwitchDelay < 2 && LightSwitchDelay != 0) {
        LightSwitchDelay += 1
    }
    
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnGammelTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnMidTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnNyTændt`)  ) {
        OvnTurnedOnTimer += 1
        if (OvnTurnedOnTimer == 10) {
            if(tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnGammelTændt`)){
            tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`ovnGammelSlukket`)
            } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnMidTændt`)){
                tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`ovnMidSlukket`)
                } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(4, 3), assets.tile`ovnNyTændt`)){
                    tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`ovnNySlukket`)
            }      
            OvnTurnedOnTimer = 0
        }
    }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerLowTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerMidTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerNyTændt`)  ) {
        TørretumblerTurnedOnTimer += 1
        if (TørretumblerTurnedOnTimer == 10) {
            if(tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerLowTændt`)){
            tiles.setTileAt(tiles.getTileLocation(9, 20), assets.tile`tørretumblerLowSlukket`)
            } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerMidTændt`)){
                tiles.setTileAt(tiles.getTileLocation(9, 20), assets.tile`tørretumblerMidSlukket`)
                } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(9, 20), assets.tile`tørretumblerNyTændt`)){
                    tiles.setTileAt(tiles.getTileLocation(9, 20), assets.tile`tørretumblerNySlukket`)
            }   
            TørretumblerTurnedOnTimer = 0
        }
    }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineLowTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineMidTændt`) || tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineNyTændt`)  ) {
        VaskemaskineTurnedOnTimer += 1
        if (VaskemaskineTurnedOnTimer == 10) {
            if(tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineLowTændt`)){
            tiles.setTileAt(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineLowSlukket`)
            } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineMidTændt`)){
                tiles.setTileAt(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineMidSlukket`)
                } else if(tiles.tileAtLocationEquals(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineNyTændt`)){
                    tiles.setTileAt(tiles.getTileLocation(3, 20), assets.tile`vaskemaskineNySlukket`)
            }       
            VaskemaskineTurnedOnTimer = 0
        }
    }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(21, 17), assets.tile`TV 11`)) {
        FjernsynTurnedOnTimer += 1
        if (FjernsynTurnedOnTimer == 10) {
            tiles.setTileAt(tiles.getTileLocation(21, 17), assets.tile`TV 1`)
            tiles.setTileAt(tiles.getTileLocation(20, 17), assets.tile`TV 4`)
            tiles.setTileAt(tiles.getTileLocation(19, 17), assets.tile`TV 6`)
            tiles.setTileAt(tiles.getTileLocation(20, 16), assets.tile`TV 2`)
            FjernsynTurnedOnTimer = 0
        }
    }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(6, 14), assets.tile`føntørrerLowTændt`)) {
        FøntørrerTurnedOnTimer += 1
        if (FøntørrerTurnedOnTimer == 10) {
            tiles.setTileAt(tiles.getTileLocation(6, 14), assets.tile`føntørrerLowSlukket`)
            FøntørrerTurnedOnTimer = 0
        }
    }
    
    


})






function LightSwitch(Room: string,) {
    if (Room == "Stue") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(17, 7), assets.tile`Brown0`)) {
            CloneStue = tileUtil.cloneMap(tileUtil.currentTilemap())
            for (let index = 0; index <= Stue.length - 1; index++) {
                if (index % 2 == 0) {
                    tiles.setTileAt(tiles.getTileLocation(Stue[index], Stue[index + 1]), assets.tile`Black`)
                }
            }
            tiles.setWallAt(tiles.getTileLocation(17, 12), true)
            tiles.setWallAt(tiles.getTileLocation(17, 13), true)
            tiles.setWallAt(tiles.getTileLocation(17, 14), true)
        }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(17, 7), assets.tile`Black`)) {
                tileUtil.forEachTileInMap(CloneStue, function (column, row, location) {
                if (column >= 17 && row >= 7 && column <= 24 && row <= 22) {
                    tiles.setTileAt(tiles.getTileLocation(column, row), tileUtil.getTileImage(CloneStue, tiles.getTileLocation(column, row)))
                }
                })
                
                tiles.setWallAt(tiles.getTileLocation(17, 12), false)
                tiles.setWallAt(tiles.getTileLocation(17, 13), false)
                tiles.setWallAt(tiles.getTileLocation(17, 14), false)
        }
            
    
    }else if (Room == "Soveværelse") {
        
    } else if (Room == "Køkken") {  
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(15, 2), assets.tile`Brown0`)) {
            CloneKøkken = tileUtil.cloneMap(tileUtil.currentTilemap())
            for (let index = 0; index <= Køkken.length - 1; index++) {
                if (index % 2 == 0) {
                    tiles.setTileAt(tiles.getTileLocation(Køkken[index], Køkken[index + 1]), assets.tile`Black`)
                }
            }
            tiles.setWallAt(tiles.getTileLocation(12, 5), true)
            tiles.setWallAt(tiles.getTileLocation(13, 5), true)
            tiles.setWallAt(tiles.getTileLocation(14, 5), true)
        }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(15, 2), assets.tile`Black`)) {
                tileUtil.forEachTileInMap(CloneKøkken, function (column, row, location) {
                if (column >= 3 && row >= 2 && column <= 15 && row <= 5) {
                    tiles.setTileAt(tiles.getTileLocation(column, row), tileUtil.getTileImage(CloneKøkken, tiles.getTileLocation(column, row)))
                }
                })
                
                tiles.setWallAt(tiles.getTileLocation(12, 5), false)
                tiles.setWallAt(tiles.getTileLocation(13, 5), false)
                tiles.setWallAt(tiles.getTileLocation(14, 5), false)
        }
        
    } else if (Room == "Badeværelse") {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(9, 14), assets.tile`Brown0`)) {
            CloneBadeværelse = tileUtil.cloneMap(tileUtil.currentTilemap())
            for (let index = 0; index <= Badeværelse.length - 1; index++) {
                if (index % 2 == 0) {
                    tiles.setTileAt(tiles.getTileLocation(Badeværelse[index], Badeværelse[index + 1]), assets.tile`Black`)
                }
            }
            tiles.setWallAt(tiles.getTileLocation(9, 15), true)
            tiles.setWallAt(tiles.getTileLocation(9, 16), true)
            tiles.setWallAt(tiles.getTileLocation(9, 17), true)
        }else if (tiles.tileAtLocationEquals(tiles.getTileLocation(9, 14), assets.tile`Black`)) {
                tileUtil.forEachTileInMap(CloneBadeværelse, function (column, row, location) {
                if (column >= 3 && row >= 14 && column <= 9 && row <= 20) {
                    tiles.setTileAt(tiles.getTileLocation(column, row), tileUtil.getTileImage(CloneBadeværelse, tiles.getTileLocation(column, row)))
                }
                })
                
                tiles.setWallAt(tiles.getTileLocation(9, 15), false)
                tiles.setWallAt(tiles.getTileLocation(9, 16), false)
                tiles.setWallAt(tiles.getTileLocation(9, 17), false)
        }
        
    }else if (Room == "Gang") {
        
    }
}