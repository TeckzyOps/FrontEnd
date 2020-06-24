webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/navBar.tsx":
/*!*******************************!*\
  !*** ./components/navBar.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);







var _jsxFileName = "D:\\ProjectConf\\FrontEnd\\components\\navBar.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var NavBar = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(NavBar, _React$Component);

  var _super = _createSuper(NavBar);

  function NavBar(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, NavBar);

    _this = _super.call(this, props);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "toggleBox", function () {
      _this.setState({
        isBoxVisible: !_this.state.isBoxVisible
      });
    });

    _this.state = {
      isBoxVisible: false
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(NavBar, [{
    key: "render",
    value: function render() {
      console.log(this.state);
      return __jsx("nav", {
        className: "navbar navbar-expand bg-dark navbar-dark",
        role: "navigation",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 13
        }
      }, __jsx("a", {
        className: "navbar-brand",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 3
        }
      }, "Navbar"), __jsx("button", {
        className: "navbar-toggler navbar-toggler-right indexcity",
        onClick: this.toggleBox,
        type: "button",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 3
        }
      }, "TOGGLE"), __jsx("div", {
        className: "navbar-collapse",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 3
        }
      }, __jsx("ul", {
        className: "navbar-nav",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 3
        }
      }, __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 9
        }
      }, "Link")))), __jsx("div", {
        className: this.state.isBoxVisible ? "navbar-collapse right" : "navbar-collapse",
        id: "collapsibleNavbar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 3
        }
      }, __jsx("div", {
        className: "wrapper",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 3
        }
      }, __jsx("nav", {
        id: "sidebar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 5
        }
      }, __jsx("div", {
        className: "sidebar-header",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 9
        }
      }, __jsx("h3", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 13
        }
      }, "Bootstrap Sidebar")), __jsx("ul", {
        className: "list-unstyled components",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 9
        }
      }, __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 13
        }
      }, "Dummy Heading"), __jsx("li", {
        className: "active",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#homeSubmenu",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        className: "dropdown-toggle",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 17
        }
      }, "Home"), __jsx("ul", {
        className: "collapse list-unstyled",
        id: "homeSubmenu",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 17
        }
      }, __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 25
        }
      }, "Home 1")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 25
        }
      }, "Home 2")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 25
        }
      }, "Home 3")))), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 17
        }
      }, "About")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#pageSubmenu",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        className: "dropdown-toggle",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 17
        }
      }, "Pages"), __jsx("ul", {
        className: "collapse list-unstyled",
        id: "pageSubmenu",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 17
        }
      }, __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 25
        }
      }, "Page 1")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 25
        }
      }, "Page 2")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 25
        }
      }, "Page 3")))), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 17
        }
      }, "Portfolio")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 17
        }
      }, "Contact")))))));
    }
  }]);

  return NavBar;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (NavBar);

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25hdkJhci50c3giXSwibmFtZXMiOlsiTmF2QmFyIiwicHJvcHMiLCJzZXRTdGF0ZSIsImlzQm94VmlzaWJsZSIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUJveCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRU1BLE07Ozs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBZ0M7QUFBQTs7QUFBQTs7QUFDNUIsOEJBQU1BLEtBQU47O0FBRDRCLG9OQU9sQixZQUFNO0FBQ2hCLFlBQUtDLFFBQUwsQ0FBZTtBQUFDQyxvQkFBWSxFQUFDLENBQUMsTUFBS0MsS0FBTCxDQUFXRDtBQUExQixPQUFmO0FBQ0QsS0FUNkI7O0FBRTVCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFBWSxFQUFDO0FBREYsS0FBYjtBQUY0QjtBQUs3Qjs7Ozs2QkFPSztBQUNKRSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLRixLQUFqQjtBQUNBLGFBQ0k7QUFBSyxpQkFBUyxFQUFDLDBDQUFmO0FBQTBELFlBQUksRUFBRyxZQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ1Y7QUFBRyxpQkFBUyxFQUFDLGNBQWI7QUFBNEIsWUFBSSxFQUFDLEdBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRFUsRUFFVjtBQUFRLGlCQUFTLEVBQUMsK0NBQWxCO0FBQWtFLGVBQU8sRUFBRSxLQUFLRyxTQUFoRjtBQUEyRixZQUFJLEVBQUMsUUFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFGVSxFQU1WO0FBQUssaUJBQVMsRUFBQyxpQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0E7QUFBSSxpQkFBUyxFQUFDLFlBQWQ7QUFBQTtBQUFBO0FBQUE7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aUJBQVMsRUFBQyxpQkFBOUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFESixFQUVJO0FBQUksaUJBQVMsRUFBQyx3QkFBZDtBQUF1QyxVQUFFLEVBQUMsYUFBMUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFHLFlBQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBREosQ0FESixFQUlJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFHLFlBQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBREosQ0FKSixFQU9JO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFHLFlBQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBREosQ0FQSixDQUZKLENBbkJKLEVBaUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFHLFlBQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREosQ0FqQ0osRUFvQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNJO0FBQUcsWUFBSSxFQUFDLEdBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESixDQXBDSixDQUxKLENBRkYsQ0FEQSxDQXJCVSxDQURKO0FBOEVIOzs7O0VBN0ZnQkssNENBQUssQ0FBQ0MsUzs7QUFnR1pULHFFQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3N0YXRpY1xcZGV2ZWxvcG1lbnRcXHBhZ2VzXFxpbmRleC5qcy44ZWIxOTE5ODU4ZGFmNmQ3YWRmNC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwgeyBpc0JveFZpc2libGU6IGJvb2xlYW4gfT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PHt9Pil7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICBpc0JveFZpc2libGU6ZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgdG9nZ2xlQm94ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoIHtpc0JveFZpc2libGU6IXRoaXMuc3RhdGUuaXNCb3hWaXNpYmxlfSk7XHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQgYmctZGFyayBuYXZiYXItZGFya1wiIHJvbGUgPSBcIm5hdmlnYXRpb25cIj5cclxuICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPk5hdmJhcjwvYT5cclxuICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0IGluZGV4Y2l0eVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQm94fSB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICBUT0dHTEVcclxuICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPiAqL31cclxuICA8L2J1dHRvbj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1jb2xsYXBzZVwiPlxyXG4gIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2XCI+XHJcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkxpbms8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gIDwvZGl2PiBcclxuXHJcbnsvKiBDdXN0b20gU2lkZSBiYXIgKi99XHJcbiAgPGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNCb3hWaXNpYmxlID8gXCJuYXZiYXItY29sbGFwc2UgcmlnaHRcIjpcIm5hdmJhci1jb2xsYXBzZVwifSBpZD1cImNvbGxhcHNpYmxlTmF2YmFyXCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XHJcbiAgICBcclxuICAgIDxuYXYgaWQ9XCJzaWRlYmFyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlYmFyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8aDM+Qm9vdHN0cmFwIFNpZGViYXI8L2gzPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC11bnN0eWxlZCBjb21wb25lbnRzXCI+XHJcbiAgICAgICAgICAgIDxwPkR1bW15IEhlYWRpbmc8L3A+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjaG9tZVN1Ym1lbnVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZHJvcGRvd24tdG9nZ2xlXCI+SG9tZTwvYT5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2xsYXBzZSBsaXN0LXVuc3R5bGVkXCIgaWQ9XCJob21lU3VibWVudVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5Ib21lIDE8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+SG9tZSAyPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPkhvbWUgMzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5BYm91dDwvYT5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNwYWdlU3VibWVudVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBjbGFzc05hbWU9XCJkcm9wZG93bi10b2dnbGVcIj5QYWdlczwvYT5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2xsYXBzZSBsaXN0LXVuc3R5bGVkXCIgaWQ9XCJwYWdlU3VibWVudVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5QYWdlIDE8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+UGFnZSAyPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlBhZ2UgMzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5Qb3J0Zm9saW88L2E+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+Q29udGFjdDwvYT5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgPC9uYXY+XHJcblxyXG48L2Rpdj5cclxuICA8L2Rpdj4gIFxyXG5cclxuXHJcbjwvbmF2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdkJhciJdLCJzb3VyY2VSb290IjoiIn0=