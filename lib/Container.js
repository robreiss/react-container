'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var blacklist = require('blacklist');
var classnames = require('classnames');
var React = require('react');

function hasChildrenWithVerticalFill(children) {
	var result = false;

	React.Children.forEach(children, function (c) {
		if (c.type && c.type.shouldFillVerticalSpace) {
			result = true;
			return;
		}
	});

	return result;
}

var Container = React.createClass({
	displayName: 'Container',

	propTypes: {
		align: React.PropTypes.oneOf(['end', 'center', 'start']),
		direction: React.PropTypes.oneOf(['column', 'row']),
		justify: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(['end', 'center', 'start'])]),
		grow: React.PropTypes.bool,
		fill: React.PropTypes.bool
	},
	componentDidMount: function componentDidMount() {
		if (this.props.scrollable && this.props.scrollable.mount) {
			this.props.scrollable.mount(this);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (this.props.scrollable && this.props.scrollable.unmount) {
			this.props.scrollable.unmount(this);
		}
	},
	render: function render() {
		var direction = this.props.direction;
		if (!direction) {
			if (hasChildrenWithVerticalFill(this.props.children)) {
				direction = 'column';
			}
		}

		var fill = this.props.fill;
		if (direction === 'column' || this.props.scrollable) {
			fill = true;
		}

		var align = this.props.align;
		if (direction === 'column' && align === 'top') align = 'start';
		if (direction === 'column' && align === 'bottom') align = 'end';
		if (direction === 'row' && align === 'left') align = 'start';
		if (direction === 'row' && align === 'right') align = 'end';

		var className = classnames(this.props.className, {
			'Container--fill': fill,
			'Container--direction-column': direction === 'column',
			'Container--direction-row': direction === 'row',
			'Container--align-center': align === 'center',
			'Container--align-start': align === 'start',
			'Container--align-end': align === 'end',
			'Container--justify-center': this.props.justify === 'center',
			'Container--justify-start': this.props.justify === 'start',
			'Container--justify-end': this.props.justify === 'end',
			'Container--justified': this.props.justify === true,
			'Container--scrollable': this.props.scrollable
		});

		var props = blacklist(this.props, 'className', 'direction', 'fill', 'justify', 'scrollable');

		return React.createElement(
			'div',
			_extends({ className: className }, props),
			this.props.children
		);
	}
});

function initScrollable() {
	var pos;
	var scrollable = {
		reset: function reset() {
			pos = { left: 0, top: 0 };
		},
		mount: function mount(element) {
			var node = React.findDOMNode(element);
			node.scrollLeft = pos.left;
			node.scrollTop = pos.top;
		},
		unmount: function unmount(element) {
			var node = React.findDOMNode(element);
			pos.left = node.scrollLeft;
			pos.top = node.scrollTop;
		}
	};
	scrollable.reset();
	return scrollable;
}

Container.initScrollable = initScrollable;

exports['default'] = Container;
module.exports = exports['default'];