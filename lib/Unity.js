'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UnityLoaderService = require('./UnityLoaderService');

var _UnityLoaderService2 = _interopRequireDefault(_UnityLoaderService);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Unity = function (_Component) {
    _inherits(Unity, _Component);

    function Unity(props) {
        _classCallCheck(this, Unity);

        var _this = _possibleConstructorReturn(this, (Unity.__proto__ || Object.getPrototypeOf(Unity)).call(this, props));

        _this.state = {
            error: null
        };
        _this.unityLoaderService = new _UnityLoaderService2.default();
        return _this;
    }

    _createClass(Unity, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.instantiate();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unityLoaderService.unmount();
        }
    }, {
        key: 'instantiate',
        value: function instantiate() {
            var _this2 = this;

            var error = null;

            if (typeof this.props.loader === 'undefined') error = 'Please provide Unity with a path to the UnityLoader in the loader prop.';
            if (typeof this.props.src === 'undefined') error = 'Please provide Unity with a path to a valid JSON in the src prop.';

            if (error !== null) {
                console.error(error);
                this.setState({ error: error });
            } else {
                this.unityLoaderService.append(this.props.loader).then(function () {
                    var unityInstance = UnityLoader.instantiate('unity', _this2.props.src, {
                        onProgress: _this2.onProgress.bind(_this2),
                        Module: _this2.props.module
                    });
                    module.exports.UnityInstance = unityInstance;
                });
            }
        }
    }, {
        key: 'onProgress',
        value: function onProgress(unityInstance, progression) {
            if (typeof this.props.onProgress !== 'undefined') {
                this.props.onProgress(progression);
            }
        }
    }, {
        key: 'getContainerStyles',
        value: function getContainerStyles() {
            return {
                width: this.props.width || '100%',
                height: this.props.height || '100%'
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'unity', style: this.getContainerStyles() },
                this.state.error !== null ? _react2.default.createElement(
                    'b',
                    null,
                    'React-Unity-Webgl error ',
                    this.state.error
                ) : _react2.default.createElement('div', { style: _Styles2.default.unity, id: 'unity' })
            );
        }
    }]);

    return Unity;
}(_react.Component);

exports.default = Unity;