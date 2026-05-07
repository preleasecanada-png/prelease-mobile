import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts } from '../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Card } from 'react-native-paper';
import { backgroundColor, flex, height, marginTop, minHeight, paddingTop, width } from 'styled-system';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import CommanHeadingScreen from '../CommanHeading';

const AccordionItem = React.memo(({ 
    title, content, renderLeftTitle, renderRightTitle, animatedHeight, contentTitle, containerStyle, onPress , handleClose}) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleAccordion = () => {
        onPress && onPress()
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        handleClose(expanded)
    };

    // React.useEffect(() => {
    //     isExpanded && toggleAccordion()
    // }, [isExpanded])

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, animatedHeight ?? WINDOW_HEIGHT * 0.4], // Adjust the output range according to the content's height
    });

    return (
        <Card style={[styles.container, containerStyle,  !expanded && { borderRadius: 50 }]}>
            <View style={[styles.accordionItem]}>
                <TouchableOpacity onPress={toggleAccordion} style={[styles.flexRow, styles.accordionHeader, expanded && {
                    display: "none",
                }]}>

                    <>
                        {renderLeftTitle ?
                            renderLeftTitle() :
                            <Text style={styles.title}>{title}</Text>
                        }
                        {renderRightTitle ?
                            renderRightTitle() :
                            <Text style={styles.rightTitle}>{expanded ? 'Collapse' : 'Expand'}</Text>
                        }
                    </>

                </TouchableOpacity>
                <Animated.View style={{ height, overflow: 'hidden' }}>
                    <View style={styles.accordionContent}>
                        <Pressable onPress={toggleAccordion}>
                            <CommanHeadingScreen

                                headingText
                                commanHeadingContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
                                commanHeadingTextStyle={styles.headingTextStyle}
                                heading={contentTitle}
                            />
                        </Pressable>
                        {content}
                    </View>
                </Animated.View>
            </View>
        </Card>
    );
});

const Accordion = ({
    containerStyle,
    children,
    renderLeftTitle,
    renderRightTitle,
    animatedHeight,
    contentTitle,
    onPress,
    handleClose
}) => {
    return (
        <AccordionItem
            animatedHeight={animatedHeight}
            title={"Item 1"}
            renderLeftTitle={renderLeftTitle}
            renderRightTitle={renderRightTitle}
            content={children}
            contentTitle={contentTitle}
            containerStyle={containerStyle}
            onPress={onPress}
            handleClose={handleClose}

            // expanded={expanded}
        // isExpanded={expanded}
        />
    );
};

const styles = EStyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: Colors.white,
        elevation: 8,

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftTextStyle: {
        fontSize: Fonts.size.small,
        ...Fonts.style.textInputText,
        color: Colors.gratLightText
    },
    rightTextStyle: {
        fontSize: Fonts.size.small,
        ...Fonts.style.boldText,
        color: Colors.darkBlack

    },
    accordionItem: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: '#ddd',

        borderRadius: 5,

        minHeight: WINDOW_HEIGHT * 0.07,
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionHeader: {
        paddingHorizontal: 15,
        height: WINDOW_HEIGHT * 0.05
        // backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accordionContent: {
        // backgroundColor: '#fff',
        marginTop: 10,
    },
    headingTextStyle: {
        fontSize: Fonts.size.h3,
        color: Colors.black,
    },
});

export default Accordion;
