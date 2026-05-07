import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const initsnapPoints = [
    250, 250
]

const CommonBottomSheet = ({
    children,
    snapPoints = initsnapPoints,
    hideButton = false,
}) => {
    const bottomSheetRef = React.useRef(null);

    return (

        <BottomSheet
            handleComponent={!hideButton ? BottomSheet.Handle : null}
            ref={bottomSheetRef}
            // onChange={handleSheetChanges}
            snapPoints={snapPoints}

        >
            <BottomSheetView style={[styles.bottomSheetContent, ]}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    )


}

export default CommonBottomSheet

const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1
        // paddingHorizontal: 20
    }

})