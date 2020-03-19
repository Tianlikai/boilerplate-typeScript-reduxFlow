import React from "react";

interface Props {
  className?: string;
  option: any;
  showLoading: boolean;
  style: React.CSSProperties;
}

export default class MyChart extends React.PureComponent<Props> {
  private divRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    import(/* webpackChunkName: "echarts" */ "echarts").then(eCharts => {
      if (this.divRef.current) {
        const { option, showLoading } = this.props;
        let chart = eCharts.getInstanceByDom(this.divRef.current);
        if (!chart) {
          chart = eCharts.init(this.divRef.current, "default");
        }

        if (showLoading) {
          chart.showLoading("default", {
            text: "加载中...",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0,
          });
        } else {
          chart.hideLoading();
          chart.setOption(option, true, false);
        }
      }
    });
  }

  render() {
    const { className, style } = this.props;
    return <div className={className} style={style} ref={this.divRef}></div>;
  }
}
