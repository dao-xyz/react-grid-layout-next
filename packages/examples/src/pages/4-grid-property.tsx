import React from "react";
import _ from "lodash";
import { GridLayout as RGL, WidthProvider } from "react-grid-layout-next";
import { PropsWithItems } from "./types.js";

const GridLayout = WidthProvider(RGL);

export default class GridPropertyLayout extends React.PureComponent<PropsWithItems, any> {
	static defaultProps = {
		isDraggable: true,
		isResizable: true,
		items: 20,
		rowHeight: 30,
		onLayoutChange: function () { },
		cols: 12
	};

	generateDOM() {
		// Generate items with properties from the layout, rather than pass the layout directly
		const layout = this.generateLayout();
		return _.map(_.range(this.props.items), function (i) {
			return (
				<div key={i} data-grid={layout[i]}>
					<span className="text">{i}</span>
				</div>
			);
		});
	}

	generateLayout() {
		const p = this.props;
		return _.map(new Array(p.items), function (item, i) {
			var w = _.result(p, "w") || Math.ceil(Math.random() * 4);
			var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
			return {
				x: (i * 2) % 12,
				y: Math.floor(i / 6) * y,
				w: w,
				h: y,
				i: i.toString()
			};
		});
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange?.(layout);
	}

	render() {
		return (
			<GridLayout onLayoutChange={this.onLayoutChange} {...this.props}>
				{this.generateDOM()}
			</GridLayout>
		);
	}
}