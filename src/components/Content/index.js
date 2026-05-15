import React from 'react';
import {Dimensions, Keyboard} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

class Content extends React.Component {
  keyboardWillShowSub;

  keyboardWillHideSub;

  rootRef;

  scrollviewRef;

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.state = {
      isVisible: true,
      //   isScrollable: false,
      //   contentHeight: 0,
      //   scrollViewSize: {
      //     width: 0,
      //     height: 0,
      //   }
    };
  }

  componentDidMount = () => {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  };

  componentWillUnmount = () => {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  };

  keyboardWillShow = () => {
    this.setState({isVisible: false});
  };

  keyboardWillHide = () => {
    this.setState({isVisible: true});
  };

  getStyle = () => {
    const {style} = this.props;
    const tmpStyle = [styles.content];
    if (style) {
      tmpStyle.push(style);
    }
    return tmpStyle;
  };

  getContentContainerStyle = () => {
    const {contentContainerStyle, hasHeader} = this.props;
    const style = [styles.contentContainerStyle];
    if (contentContainerStyle) {
      style.push(contentContainerStyle);
    }
    if (hasHeader === false) {
      style.push({paddingTop: 0});
    }
    return style;
  };

  // componentDidMount() {
  //   this.onContentSizeChange();
  // }

  // onContentSizeChange = (contentWidth, contentHeight) => {
  //   this.setState({
  //     contentHeight: contentHeight,
  //   });
  //   this.checkScrollability()
  // };

  // scrollToBottom = () => {
  //   this.scrollRef.scrollToEnd({ animated: true });
  //   this.setState({ isScrollable: false, isBottom: true }); // Hide the arrow button after scrolling to the bottom
  // };

  // onScroll = (event) => {
  //   const { contentHeight } = this.state;
  //   const windowHeight = Dimensions.get('window').height;
  //   const scrollY = event.nativeEvent.contentOffset.y;

  //   // Check if scrolled to bottom
  //   if (scrollY + windowHeight >= contentHeight - windowHeight) {
  //     this.setState({ isScrollable: false });

  //   }
  //   else if (scrollY < contentHeight) {
  //     this.setState({ isScrollable: true });
  //   }
  // };
  // handleLayout = (event) => {
  //   this.setState({
  //     scrollViewSize: { width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height }
  //   });
  //   this.checkScrollability();
  // };

  // checkScrollability = () => {
  //   const { contentWidth, scrollViewSize } = this.state;
  //   this.setState({
  //     scrollViewSize: contentWidth.width > scrollViewSize.width || contentWidth.height > scrollViewSize.height
  //   })
  // };

  render = () => {
    const {
      children,
      extraScrollHeight,
      showsVerticalScrollIndicator,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      scrollEnabled,
      isBottomSheet,
    } = this.props;

    const style = this.getStyle();
    const contentContainerStyle = this.getContentContainerStyle();
    const ScrollComponent = isBottomSheet
      ? ScrollView
      : KeyboardAwareScrollView;

    return (
      <ScrollComponent
        enableResetScrollToCoords
        scrollEnabled={scrollEnabled}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        onScroll={this.onScroll}
        resetScrollToCoords={disableKBDismissScroll ? undefined : {x: 0, y: 0}}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        ref={c => {
          this.scrollviewRef = c;
          this.rootRef = c;
          this.scrollRef = c;
        }}
        style={style}
        contentContainerStyle={contentContainerStyle}
        extraScrollHeight={extraScrollHeight || 81}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
        nestedScrollEnabled={this.props.nestedScrollEnabled || false}
        // onContentSizeChange={this.onContentSizeChange}
        // handleLayout={this.handleLayout}
      >
        {children}

        {/* {this.state.isScrollable &&
          <TouchableOpacity onPress={this.scrollToBottom} style={{ position: "absolute", zIndex: 99, right: 10, bottom: this.state?.contentHeight - WINDOW_HEIGHT + 10 }}>
            <Icon name="chevron-down-circle-outline" color={Colors.black} size={24} />
          </TouchableOpacity>} */}
      </ScrollComponent>
    );
  };
}

export default Content;
