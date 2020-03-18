import React from "react";
import { BASE64_LOADING_IMAGE, BASE64_FAIL_IMAGE } from "./constant";

interface Props {
  className?: string;
  isVisible?: boolean;
  src: string;
}

interface State {
  src: string;
}

export default class LazyImage extends React.PureComponent<Props, State> {
  state = {
    src: BASE64_LOADING_IMAGE,
  };

  componentDidMount() {
    const { isVisible, src } = this.props;
    if (isVisible && src) {
      this.uploadImage(src);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { isVisible = false } = prevProps;
    const { isVisible: nextIsVisible, src } = this.props;
    if (nextIsVisible && nextIsVisible !== isVisible && src) {
      this.uploadImage(src);
    }
  }

  uploadImage = (src: string) => {
    const img = new Image();
    img.onload = this.handleSuccess(src);
    img.onerror = this.handleFail;
    img.src = src;
  };

  handleFail: OnErrorEventHandler = () =>
    this.setState({ src: BASE64_FAIL_IMAGE });

  handleSuccess = (src: string): any => {
    this.setState({ src });
  };

  render() {
    const { className } = this.props;
    const { src } = this.state;
    return <img className={className} src={src} alt="" />;
  }
}
