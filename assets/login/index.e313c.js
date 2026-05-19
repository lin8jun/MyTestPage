System.register("chunks:///_virtual/login", ['./LoginPage.ts', './LoginUtils.ts', './RegDialog.ts', './ResetPwdDialog.ts'], function () {
  return {
    setters: [null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/LoginPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './BaseEntryView.ts', './GameMgrs.ts', './UIHelper.ts', './NetConstant.ts', './NGame.ts', './BackgroundMainLoading.ts', './GameDataMgr.ts', './CooldownManager.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PlatformUtils.ts', './Decorators.ts', './EncryPlus.ts', './LoginUtils.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _extends, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, UIOpacity, tween, Sprite, EditBox, sys, BundleName, StorageKey, EventName, UserLoginType, BaseEntryView, gameMgrs, UIHelper, CMD_SUCCESS, NGame, backgroundMainLoading, gameDataMgr, CooldownManager, HttpPbFunc, pbfixUserLoginType, PlatformUtils, inject, encryPlus, LoginUtils, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      Sprite = module.Sprite;
      EditBox = module.EditBox;
      sys = module.sys;
    }, function (module) {
      BundleName = module.BundleName;
      StorageKey = module.StorageKey;
      EventName = module.EventName;
      UserLoginType = module.UserLoginType;
    }, function (module) {
      BaseEntryView = module.BaseEntryView;
    }, function (module) {
      gameMgrs = module.default;
    }, function (module) {
      UIHelper = module.UIHelper;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      backgroundMainLoading = module.default;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      CooldownManager = module.CooldownManager;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixUserLoginType = module.pbfixUserLoginType;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      encryPlus = module.encryPlus;
    }, function (module) {
      LoginUtils = module.LoginUtils;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "96e1ajVY+hOFqDzSnUf8amB", "LoginPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoginPage = exports('default', (_dec = ccclass('LoginPage'), _dec2 = inject("node_reg/btn_reg/", Node), _dec3 = inject("node_list/view/node_content/node_remenber/btn_find_pwd/", Node), _dec4 = inject("node_list/view/node_content/node_pwd/btn_pwd_show/", Node), _dec5 = inject("node_list/view/node_content/node_pwd/btn_pwd_show/icon_pwd_hide/", Node), _dec6 = inject("node_list/view/node_content/node_pwd/btn_pwd_show/icon_pwd_show/", Node), _dec7 = inject("node_list/view/node_content/node_remenber/node_remenber/", Node), _dec8 = inject("node_list/view/node_content/node_remenber/node_remenber/btn_checkbox/checkbox/icon_sel/", Node), _dec9 = inject("node_list/view/node_content/node_username/EditBox/", Node), _dec10 = inject("node_list/view/node_content/node_pwd/EditBox/", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseEntryView) {
        _inheritsLoose(LoginPage, _BaseEntryView);
        function LoginPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseEntryView.call.apply(_BaseEntryView, [this].concat(args)) || this;
          _this.bundleStr = BundleName.LOGIN;
          _this.allNode = null;
          _initializerDefineProperty(_this, "regBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "resetPwdBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdShowTypeBtn", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdHideTag", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdShowTag", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "remenberPwdBtn", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "remenberPwdSelTag", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "userNameEditBoxNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1EditBoxNode", _descriptor9, _assertThisInitialized(_this));
          _this.userNameEditBox = null;
          _this.pwd1EditBox = null;
          return _this;
        }
        var _proto = LoginPage.prototype;
        _proto.create = function create() {
          gameDataMgr.gameBaseData.isLogout = true;
        };
        _proto.onEnable = function onEnable() {
          var uIOpacity = this.node.getComponent(UIOpacity);
          uIOpacity.opacity = 0;
          tween(uIOpacity).to(1, {
            opacity: 255
          }).start();
          this.updateBackBtnVisible();
        };
        _proto.open = function open() {
          gameMgrs.removeLoadingMask();
          this.allNode = this.getAllChildrenMap(this.node);
          this.allNode.loginBtn.getComponent(Sprite).grayscale = true;
          this.iniveView();
          this.allNode.phoneEditBox.on('text-changed', this.phoneEditBoxFunc, this);
          this.allNode.smsEditBox.on('text-changed', this.smsEditBoxFunc, this);
          this.userNameEditBoxNode.on('text-changed', this.userNameEditBoxFunc, this);
          this.pwd1EditBoxNode.on('text-changed', this.userNameEditBoxFunc, this);
          this.addClickEvent();
          var lastLoginType = NGame.storage.getNumber(StorageKey.LOGIN_TYPE, null);
          if (!lastLoginType) ;else {
            if (lastLoginType == pbfixUserLoginType.pbfixUSER_LOGIN_TYPE_PHONE) {
              this.allNode.loginBtn.child("tag_last_login").active = true;
              this.allNode.guestBtn.child("tag_last_login").active = false;
              var phone = NGame.storage.get(StorageKey.PHONE_NUMBER, "");
              if (phone && phone.length > 0) {
                this.allNode.phoneEditBox.getComponent(EditBox).string = phone;
              }
            } else if (lastLoginType == pbfixUserLoginType.pbfixUSER_LOGIN_TYPE_ACCOUNT) {
              this.allNode.loginBtn.child("tag_last_login").active = true;
              this.allNode.guestBtn.child("tag_last_login").active = false;
            } else {
              this.allNode.guestBtn.child("tag_last_login").active = true;
              this.allNode.loginBtn.child("tag_last_login").active = false;
            }
          }
          this.preloadPage();
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        }

        /** 侧滑返回上一页 */;
        _proto.onEdgeSwipeBack = function onEdgeSwipeBack(targetNode) {
          if (this.ignoreEdgeSwipeBack(targetNode)) {
            return;
          }
          var backBtnVisible = this.node.child('node_top').child('backNode').active;
          if (backBtnVisible) {
            this.gotoLoadingPage();
          }
        };
        _proto.preloadPage = /*#__PURE__*/function () {
          var _preloadPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Promise.all([UIHelper.regisRegDialog(), UIHelper.regisResetPwdDialog()]);
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function preloadPage() {
            return _preloadPage.apply(this, arguments);
          }
          return preloadPage;
        }();
        _proto.addClickEvent = function addClickEvent() {
          var _this2 = this;
          // 左上角返回按钮，只有临时用户才会显示，点击进入到大厅页面
          var backBtn = this.node.child('node_top').child('backNode');
          this.onClicked(backBtn, function () {
            _this2.gotoLoadingPage();
          }, false, 1.0);
          this.onClicked(this.allNode.smsBtn, function () {
            // FirebaseMgr.reportCommonEvent(FirebaseMgr.commonEventName.SEND_SMS)
            _this2.sendPhoneCode();
          }, false, 2.0);
          this.onClicked(this.allNode.guestBtn, function () {
            GoogleAnalytics.track(GAEvent.CLICK_GUEST_LOGIN);
            _this2.guestLogin();
          });
          this.onClicked(this.allNode.loginBtn, function () {
            // this.phoneLogin();
            GoogleAnalytics.track(GAEvent.CLICK_ACCOUNT_LOGIN);
            _this2.accountLogin();
          });

          // =============== 用户名+密码登录相关 ===============
          this.onClicked(this.regBtn, function () {
            GoogleAnalytics.track(GAEvent.REGISTER_NOW);
            _this2.onClickRegBtn();
          });
          this.onClicked(this.resetPwdBtn, function () {
            _this2.onClickResetPwdBtn();
          });
          this.onClicked(this.remenberPwdBtn, function () {
            _this2.onClickRemenberPwdBtn();
          }, false, 0.1, false);

          // this.onClicked(this.pwdShowTypeBtn, () => {
          //     this.onClickPwdShowTypeBtn();
          // }, false, 0.1, false);

          this.onClicked(this.pwdShowTypeBtn, function () {
            _this2.onClickPwdShowTypeBtn();
          });
        };
        _proto.iniveView = function iniveView() {
          this.userNameEditBox = this.userNameEditBoxNode.getComponent(EditBox);
          this.pwd1EditBox = this.pwd1EditBoxNode.getComponent(EditBox);
          var account = NGame.storage.get(StorageKey.INPUT_USERNAME, '');
          var password = NGame.storage.get(StorageKey.INPUT_PASSWORD, '');
          this.userNameEditBox.string = account;
          this.pwd1EditBox.string = password;
          this.userNameEditBoxFunc(this.userNameEditBox);
        };
        _proto.phoneEditBoxFunc = function phoneEditBoxFunc(editBox) {
          var phoneNum = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var Captcha = this.allNode.smsEditBox.getComponent(EditBox).string;
          this.allNode.loginBtn.getComponent(Sprite).grayscale = phoneNum.length == 0 || Captcha.length == 0;
        };
        _proto.smsEditBoxFunc = function smsEditBoxFunc(editBox) {
          var phoneNum = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var Captcha = this.allNode.smsEditBox.getComponent(EditBox).string;
          this.allNode.loginBtn.getComponent(Sprite).grayscale = phoneNum.length == 0 || Captcha.length == 0;
        };
        _proto.userNameEditBoxFunc = function userNameEditBoxFunc(editBox) {
          var userName = this.userNameEditBox.string.trim();
          var pwd1 = this.pwd1EditBox.string.trim();
          this.allNode.loginBtn.getComponent(Sprite).grayscale = userName.length < 6 || pwd1.length < 6;
        };
        _proto.sendPhoneCode = function sendPhoneCode() {
          var _this3 = this;
          var phone = this.allNode.phoneEditBox.getComponent(EditBox).string;
          if (phone.length == 0) {
            NGame.tips.toast("Please enter your phone number".i18nStr());
          } else {
            var _gameDataMgr$userInfo, _gameDataMgr$userInfo2;
            HttpPbFunc.pbfixSendSmsCodeReq(this.node, {
              pbfixPhone: phone,
              pbfixTimezone: PlatformUtils.getTimeZone(),
              pbfixUid: (_gameDataMgr$userInfo = (_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixUid) != null ? _gameDataMgr$userInfo : 0
            }, function (result) {
              if (result.pbfixCode == CMD_SUCCESS) {
                _this3.allNode.smsBtn.getComponent(CooldownManager).onOtpBtnClick();
              }
            });
          }
        };
        _proto.phoneLogin = function phoneLogin() {
          var _this4 = this;
          var phoneNum = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var otp = this.allNode.smsEditBox.getComponent(EditBox).string;
          if (phoneNum.length == 0 || otp.length == 0) {
            NGame.tips.toast("Please enter your phone number and verification code".i18nStr());
            return;
          }

          // const loginParams: web.IpbfixUserLoginReq = {
          var loginParams = _extends({}, PlatformUtils.getLoginBaseParams(), {
            pbfixUserType: UserLoginType.USER_LOGIN_TYPE_PHONE,
            pbfixAccount: phoneNum,
            pbfixOtp: otp
          });
          HttpPbFunc.pbfixUserLoginReq(this.node, loginParams, function (result) {
            _this4.onLogined(result);
          });
        };
        _proto.guestLogin = function guestLogin() {
          var _this5 = this;
          var loginParams = _extends({}, PlatformUtils.getLoginBaseParams(), {
            pbfixUserType: UserLoginType.USER_LOGIN_TYPE_GUEST
          });
          HttpPbFunc.pbfixUserLoginReq(this.node, loginParams, function (result) {
            _this5.onLogined(result);
            NGame.storage.set(StorageKey.PHONE_NUMBER, "");
          });
        };
        _proto.verifyInput = function verifyInput() {
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();

          // 【登录场景不验证用户名和密码的格式，方便自动化账号登入】
          // 正则：开头到结尾，只能是 字母/数字/下划线，长度 6~20
          // if (!LoginUtils.validateUsername(account)) {
          //     return false;
          // }

          // if (!LoginUtils.validatePwd(oriPassword)) {
          //     return false;
          // }

          // 登录的时候只需要验证长度
          if (account.length == 0) {
            NGame.tips.toast("Please enter your username".i18nStr());
            return false;
          }
          if (oriPassword.length == 0) {
            NGame.tips.toast("Please enter your password".i18nStr());
            return false;
          }
          return true;
        };
        _proto.accountLogin = function accountLogin() {
          var _this6 = this;
          if (!this.verifyInput()) {
            return;
          }
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var md5Password = encryPlus.hash256(oriPassword); // hash 256

          var reqParams = _extends({}, PlatformUtils.getLoginBaseParams(), {
            pbfixUserType: UserLoginType.USER_LOGIN_TYPE_ACCOUNT,
            pbfixAccount: account,
            pbfixPwd: md5Password,
            pbfixOriPwd: oriPassword
          });
          HttpPbFunc.pbfixUserLoginReq(this.node, reqParams, function (result) {
            _this6.onLogined(result);
          });
        };
        _proto.onLogined = /*#__PURE__*/function () {
          var _onLogined = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(result) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!((result == null ? void 0 : result.pbfixCode) != CMD_SUCCESS)) {
                    _context2.next = 5;
                    break;
                  }
                  NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Login failed".i18nStr());

                  // 清除token
                  gameDataMgr.gameBaseData.token = "";
                  gameDataMgr.gameBaseData.isLogout = true; // 标记为退出登录状态，下次不会自动登录
                  return _context2.abrupt("return");
                case 5:
                  if (sys.isBrowser) {
                    this.gotoLoadingPage({
                      init: {
                        isLogined: true
                      }
                    });
                  } else {
                    NGame.pageMgr.openEntryPage(BundleName.DEFAULT, {
                      isLogined: true
                    }); // 原生端需要走Update 热更页面
                  }

                  this.closeAndDestroy();
                case 7:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onLogined(_x) {
            return _onLogined.apply(this, arguments);
          }
          return onLogined;
        }() // 进入加载页面
        ;

        _proto.gotoLoadingPage = /*#__PURE__*/
        function () {
          var _gotoLoadingPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (params === void 0) {
                    params = {};
                  }
                  backgroundMainLoading.triggerPreloading(params);
                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          function gotoLoadingPage(_x2) {
            return _gotoLoadingPage.apply(this, arguments);
          }
          return gotoLoadingPage;
        }();
        _proto.updateBackBtnVisible = function updateBackBtnVisible() {
          this.node.child('node_top').child('backNode').active = gameDataMgr.isGoStraightToHall;
        }

        //===================== 用户名+密码登录逻辑 ====================== ↓
        ;

        _proto.onClickRegBtn = function onClickRegBtn() {
          UIHelper.openRegDialog();
        };
        _proto.onClickResetPwdBtn = function onClickResetPwdBtn() {
          var _this7 = this;
          var userName = this.userNameEditBox.string.trim();
          if (!LoginUtils.validateUsername(userName)) {
            return;
          }
          UIHelper.openResetPwdDialog({
            userName: userName,
            onActClose: function onActClose() {
              _this7.freshPwdInput();
            }
          });
        }

        /**
         * 从重置密码页面回来，刷新密码输入框
         */;
        _proto.freshPwdInput = function freshPwdInput() {
          var password = NGame.storage.get(StorageKey.INPUT_PASSWORD, '');
          this.pwd1EditBox.string = password;
        };
        _proto.onClickRemenberPwdBtn = function onClickRemenberPwdBtn() {
          this.remenberPwdSelTag.active = !this.remenberPwdSelTag.active;
          if (this.remenberPwdSelTag.active) {
            NGame.storage.set(StorageKey.REMENBER_PWD, true); // 记住密码
          } else {
            NGame.storage.set(StorageKey.REMENBER_PWD, false); // 不记住密码
          }
        };

        _proto.onClickPwdShowTypeBtn = function onClickPwdShowTypeBtn() {
          this.pwdHideTag.active = !this.pwdHideTag.active;
          this.pwdShowTag.active = !this.pwdShowTag.active;
          this.pwd1EditBox.inputFlag = this.pwdHideTag.active ? EditBox.InputFlag.PASSWORD : EditBox.InputFlag.DEFAULT;
        }

        //===================== 用户名+密码登录逻辑 ====================== ↑
        ;

        _proto.closeView = function closeView() {
          // const mainScene = GlobalManager.scenes.find(s => s.name === 'MainScene');
          // if (mainScene) {
          //     console.log(`[LoadingController] 进入主场景: ${mainScene.name}`);
          //     SceneManager.instance.loadScene(mainScene);
          // } else {
          //     console.error('[LoadingController] 未找到主场景配置');
          // }
          NGame.pageMgr.openEntryPage(BundleName.HALL);
          this.closeAndDestroy();
        };
        return LoginPage;
      }(BaseEntryView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "regBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resetPwdBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pwdShowTypeBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pwdHideTag", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pwdShowTag", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "remenberPwdBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "remenberPwdSelTag", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "userNameEditBoxNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "pwd1EditBoxNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginUtils.ts", ['cc', './NGame.ts'], function (exports) {
  var cclegacy, NGame;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NGame = module.NGame;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d08eax+dW1JmKxqGzEGECKB", "LoginUtils", undefined);
      var LoginUtils = exports('LoginUtils', /*#__PURE__*/function () {
        function LoginUtils() {}
        /**
         * 验证用户名是否符合规则， 6-20位, 只能字母/数字/下划线，并且以字母开头
         * @param account 
         * @returns 
         */
        LoginUtils.validateUsername = function validateUsername(account) {
          if (account === void 0) {
            account = '';
          }
          if (account.length == 0) {
            NGame.tips.toast("Please enter your username".i18nStr());
            return false;
          }
          var regexStart = /^[a-zA-Z]/;
          if (!regexStart.test(account)) {
            NGame.tips.toast("Must begin with a letter".i18nStr());
            return false;
          }

          // const regex = /^[a-zA-Z0-9_]{6,20}$/;
          var regex = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
          var regexResult = regex.test(account);
          if (!regexResult) {
            NGame.tips.toast("Username rules".i18nStr());
            return false;
          }
          return true;
        }

        /**
         * 验证密码规则
         * 6-20位，必须包含 字母、数字、特殊符号 中至少两种
         */;
        LoginUtils.validatePwd = function validatePwd(password) {
          if (password === void 0) {
            password = '';
          }
          if (password.length == 0) {
            NGame.tips.toast("Please enter your password".i18nStr());
            return false;
          }
          var toastFunc = function toastFunc() {
            NGame.tips.toast("Password rules".i18nStr());
          };

          // 1. 先验证长度和允许的字符范围（字母、数字、常见特殊符号）
          var lengthReg = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;':",./<>?]{6,20}$/;
          if (!lengthReg.test(password)) {
            toastFunc();
            return false;
          }

          // 2. 验证至少包含两种类型
          var types = 0;
          if (/[a-zA-Z]/.test(password)) types++; // 有字母
          if (/[0-9]/.test(password)) types++; // 有数字
          if (/[^a-zA-Z0-9]/.test(password)) types++; // 有特殊符号

          if (types < 2) {
            toastFunc();
            return false;
          }

          // console.log("validatePwd-true->", password);
          return true;
        }

        /**
         * 验证两次密码是否一致
         * @param oriPassword 
         * @param confirmPassword 
         * @returns 
         */;
        LoginUtils.validateTwoPwd = function validateTwoPwd(oriPassword, confirmPassword) {
          if (!oriPassword || !confirmPassword || oriPassword != confirmPassword) {
            NGame.tips.toast("The two passwords do not match".i18nStr());
            return false;
          }
          return true;
        };
        return LoginUtils;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RegDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './EncryPlus.ts', './MKViewBase.ts', './NetConstant.ts', './NGame.ts', './BackgroundMainLoading.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './PlatformUtils.ts', './LoginUtils.ts', './MKExport.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _extends, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, tween, UIOpacity, EditBox, UITransform, Label, sys, UserLoginType, StorageKey, EventName, BundleName, inject, encryPlus, MKViewBase, CMD_SUCCESS, NGame, backgroundMainLoading, gameDataMgr, HttpPbFunc, isResponseValid, PlatformUtils, LoginUtils, gloEvent, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      EditBox = module.EditBox;
      UITransform = module.UITransform;
      Label = module.Label;
      sys = module.sys;
    }, function (module) {
      UserLoginType = module.UserLoginType;
      StorageKey = module.StorageKey;
      EventName = module.EventName;
      BundleName = module.BundleName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      encryPlus = module.encryPlus;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      backgroundMainLoading = module.default;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      LoginUtils = module.LoginUtils;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;
      cclegacy._RF.push({}, "a8a44Oys1lCeqm35QI+nJ1n", "RegDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RegDialog = exports('RegDialog', (_dec = ccclass('RegDialog'), _dec2 = inject("content/node_contain/btn_close/", Node), _dec3 = inject("content/node_contain/label_title/", Node), _dec4 = inject("content/node_contain/", Node), _dec5 = inject("content/node_contain/node_content/", Node), _dec6 = inject("content/node_contain/node_content/regBtn/", Node), _dec7 = inject("content/node_contain/node_content/guestBtn/", Node), _dec8 = inject("content/node_contain/node_content/node_agreen/", Node), _dec9 = inject("content/node_contain/node_content/or/", Node), _dec10 = inject("content/node_contain/node_content/node_agreen/btn_checkbox/", Node), _dec11 = inject("content/node_contain/node_content/node_agreen/btn_checkbox/checkbox/icon_sel/", Node), _dec12 = inject("content/node_contain/node_content/node_pwd1/btn_pwd_show/", Node), _dec13 = inject("content/node_contain/node_content/node_pwd1/btn_pwd_show/icon_pwd_hide/", Node), _dec14 = inject("content/node_contain/node_content/node_pwd1/btn_pwd_show/icon_pwd_show/", Node), _dec15 = inject("content/node_contain/node_content/node_pwd2/btn_pwd_show/", Node), _dec16 = inject("content/node_contain/node_content/node_pwd2/btn_pwd_show/icon_pwd_hide/", Node), _dec17 = inject("content/node_contain/node_content/node_pwd2/btn_pwd_show/icon_pwd_show/", Node), _dec18 = inject("content/node_contain/node_content/node_username/EditBox/", Node), _dec19 = inject("content/node_contain/node_content/node_pwd1/EditBox/", Node), _dec20 = inject("content/node_contain/node_content/node_pwd2/EditBox/", Node), _dec21 = inject("content/node_contain/node_content/node_invite_code/", Node), _dec22 = inject("content/node_contain/node_content/node_invite_code/EditBox/", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(RegDialog, _MKViewBase);
        function RegDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titleLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "containNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "contentNode", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "regBtn", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "guestLoginBtn", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "agreenPolicyNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lineOrNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "agreenPolicyBtn", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "agreenPolicySelTag", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1ShowTypeBtn", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1HideIcon", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1ShowIcon", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2ShowTypeBtn", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2HideIcon", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2ShowIcon", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "userNameEditBoxNode", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1EditBoxNode", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2EditBoxNode", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "inviteCodeNode", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "inviteCodeEditBoxNode", _descriptor21, _assertThisInitialized(_this));
          _this.userNameEditBox = null;
          _this.pwd1EditBox = null;
          _this.pwd2EditBox = null;
          _this.inviteCodeEditBox = null;
          return _this;
        }
        var _proto = RegDialog.prototype;
        _proto.create = function create() {
          // this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          tween(this.node.getComponent(UIOpacity)).to(0.3, {
            opacity: 255
          }).start();
          this.initView();
          this.addClickEvent();
        };
        _proto.initView = function initView() {
          this.initVisible();
          this.userNameEditBox = this.userNameEditBoxNode.getComponent(EditBox);
          this.pwd1EditBox = this.pwd1EditBoxNode.getComponent(EditBox);
          this.pwd2EditBox = this.pwd2EditBoxNode.getComponent(EditBox);
          this.inviteCodeEditBox = this.inviteCodeEditBoxNode.getComponent(EditBox);
        };
        _proto.initVisible = function initVisible() {
          var _this$initData;
          var isBindAccountDialog = (_this$initData = this.initData) == null ? void 0 : _this$initData.isBindAccountDialog; // 是否是绑定账号弹窗（个人信息页面打开）

          var contentTransform = this.node.child('content').getComponent(UITransform);
          var height;
          if (isBindAccountDialog) {
            // 绑定账号弹框有一些组件不需要显示
            height = 702;
            this.guestLoginBtn.active = false;
            this.inviteCodeNode.active = false;
            this.lineOrNode.active = false;
            this.titleLabel.getComponent(Label).string = 'Bind Account'.i18nStr();
            this.regBtn.child('Label').getComponent(Label).string = 'Bind Now'.i18nStr();
          } else {
            height = 922;
            this.guestLoginBtn.active = true;
            this.inviteCodeNode.active = true;
            this.lineOrNode.active = true;
            this.titleLabel.getComponent(Label).string = 'Register'.i18nStr();
            this.regBtn.child('Label').getComponent(Label).string = 'Register'.i18nStr();
          }
          contentTransform.height = height;
          this.containNode.setPosition(0, height / 2);
        };
        _proto.addClickEvent = function addClickEvent() {
          var _this2 = this;
          this.onClicked(this.closeBtn, function () {
            _this2.closeAndDestroy();
          });
          this.onClicked(this.regBtn, function () {
            GoogleAnalytics.track(GAEvent.REGISTER_COMPLETE);
            _this2.onClickRegBtn();
          });
          this.onClicked(this.guestLoginBtn, function () {
            _this2.onClickGuestLoginBtn();
          });
          this.onClicked(this.agreenPolicyBtn, function () {
            _this2.onClickAgreenPolicyBtn();
          });
          this.onClicked(this.pwd1ShowTypeBtn, function () {
            _this2.onClickPwd1ShowTypeBtn();
          });
          this.onClicked(this.pwd2ShowTypeBtn, function () {
            _this2.onClickPwd2ShowTypeBtn();
          });
        };
        _proto.onClickPwd1ShowTypeBtn = function onClickPwd1ShowTypeBtn() {
          this.pwd1HideIcon.active = !this.pwd1HideIcon.active;
          this.pwd1ShowIcon.active = !this.pwd1ShowIcon.active;
          this.switchPwdShowType(this.pwd1EditBox, !this.pwd1HideIcon.active);
        };
        _proto.onClickPwd2ShowTypeBtn = function onClickPwd2ShowTypeBtn() {
          this.pwd2HideIcon.active = !this.pwd2HideIcon.active;
          this.pwd2ShowIcon.active = !this.pwd2ShowIcon.active;
          this.switchPwdShowType(this.pwd2EditBox, !this.pwd2HideIcon.active);
        };
        _proto.switchPwdShowType = function switchPwdShowType(editBox, isShowPassword) {
          if (isShowPassword) {
            // 显示明文
            editBox.inputFlag = EditBox.InputFlag.DEFAULT;
          } else {
            // 密码模式（小黑点）
            editBox.inputFlag = EditBox.InputFlag.PASSWORD;
          }
        };
        _proto.onClickGuestLoginBtn = function onClickGuestLoginBtn() {
          var _this3 = this;
          var loginParams = _extends({}, PlatformUtils.getLoginBaseParams(), {
            pbfixUserType: UserLoginType.USER_LOGIN_TYPE_GUEST
          });
          HttpPbFunc.pbfixUserLoginReq(this.node, loginParams, function (result) {
            _this3.onLogined(result);
            NGame.storage.set(StorageKey.PHONE_NUMBER, "");
          });
        }

        // 进入加载页面
        ;

        _proto.gotoLoadingPage = /*#__PURE__*/
        function () {
          var _gotoLoadingPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (params === void 0) {
                    params = {};
                  }
                  backgroundMainLoading.triggerPreloading(params);
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function gotoLoadingPage(_x) {
            return _gotoLoadingPage.apply(this, arguments);
          }
          return gotoLoadingPage;
        }();
        _proto.onClickAgreenPolicyBtn = function onClickAgreenPolicyBtn() {
          this.agreenPolicySelTag.active = !this.agreenPolicySelTag.active;
        };
        _proto.onClickRegBtn = function onClickRegBtn() {
          var _this$initData2;
          if (!this.verifyInput()) {
            return;
          }
          var isBindAccountDialog = (_this$initData2 = this.initData) == null ? void 0 : _this$initData2.isBindAccountDialog; // 是否是绑定账号弹窗（个人信息页面打开）
          if (isBindAccountDialog) {
            // 绑定账号弹框有一些组件不需要显示
            this.pbfixBindAccountReq();
          } else {
            this.pbfixRegisterReq();
          }
        };
        _proto.verifyInput = function verifyInput() {
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var confirmPassword = this.pwd2EditBox.string.trim();

          // 正则：开头到结尾，只能是 字母/数字/下划线，长度 6~20
          if (!LoginUtils.validateUsername(account)) {
            return false;
          }
          if (!LoginUtils.validatePwd(oriPassword)) {
            return false;
          }
          if (!LoginUtils.validateTwoPwd(oriPassword, confirmPassword)) {
            return false;
          }
          if (!this.agreenPolicySelTag.active) {
            NGame.tips.toast("Please agree to the terms and conditions".i18nStr());
            return false;
          }
          return true;
        };
        _proto.pbfixRegisterReq = function pbfixRegisterReq() {
          var _this4 = this;
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var md5Password = encryPlus.hash256(oriPassword); // hash 256

          var reqParams = _extends({}, PlatformUtils.getLoginBaseParams(), {
            pbfixAccount: account,
            pbfixPwd: md5Password,
            pbfixUserType: UserLoginType.USER_LOGIN_TYPE_ACCOUNT,
            pbfixOriPwd: oriPassword
          });
          var inviteCode = this.inviteCodeEditBox.string.trim();
          if (inviteCode.length > 0) {
            reqParams.pbfixBindInviteCode = inviteCode;
          }
          HttpPbFunc.pbfixRegisterReq(this.node, reqParams, function (result) {
            _this4.onReged(result);
          });
        };
        _proto.pbfixBindAccountReq = function pbfixBindAccountReq() {
          var _this5 = this;
          // const params = {
          //     pbfixAccount:'',
          //     pbfixPwd: ''
          // }

          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var md5Password = encryPlus.hash256(oriPassword); // hash 256

          var params = {
            pbfixAccount: account,
            pbfixPwd: md5Password
          };
          HttpPbFunc.pbfixBindAccountReq(this.node, params, function (result) {
            if (isResponseValid(result, "Bind account failed".i18nStr())) {
              NGame.tips.toast("Bind account success".i18nStr());
              gameDataMgr.userInfo.pbfixAccount = account;
              // 绑定成功后，将用户名和密码存储本地+通知个人信息页面刷新
              _this5.saveAccountInfo(account, oriPassword);
              _this5.notifyUserInfoRefresh();
              _this5.closeAndDestroy();
            }
          });
        }

        // 保存账号密码到本地
        ;

        _proto.saveAccountInfo = function saveAccountInfo(account, pwd) {
          NGame.storage.set(StorageKey.INPUT_USERNAME, account);
          NGame.storage.set(StorageKey.INPUT_PASSWORD, pwd);
        }

        // 通知个人信息页面刷新
        ;

        _proto.notifyUserInfoRefresh = function notifyUserInfoRefresh() {
          gloEvent.emit(EventName.ON_BIND_ACCOUNT);
        };
        _proto.onReged = function onReged(result) {
          if ((result == null ? void 0 : result.pbfixCode) != CMD_SUCCESS) {
            NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "reg failed".i18nStr());
            return;
          } else {
            // if (sys.isBrowser) {
            //     this.gotoLoadingPage({ init:  { isLogined: true } });
            // }else{
            //     NGame.pageMgr.openEntryPage(BundleName.DEFAULT, { isLogined: true }); // 原生端需要走Update 热更页面
            // }

            // this.closeAndDestroy()
            this.regOrLoginFinished();
          }
        };
        _proto.onLogined = /*#__PURE__*/function () {
          var _onLogined = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(result) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!((result == null ? void 0 : result.pbfixCode) != CMD_SUCCESS)) {
                    _context2.next = 5;
                    break;
                  }
                  NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Login failed".i18nStr());

                  // 清除token
                  gameDataMgr.gameBaseData.token = "";
                  gameDataMgr.gameBaseData.isLogout = true; // 标记为退出登录状态，下次不会自动登录
                  return _context2.abrupt("return");
                case 5:
                  this.regOrLoginFinished();
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onLogined(_x2) {
            return _onLogined.apply(this, arguments);
          }
          return onLogined;
        }();
        _proto.regOrLoginFinished = function regOrLoginFinished() {
          NGame.pageMgr.closeEntryPage(BundleName.LOGIN);
          if (sys.isBrowser) {
            this.gotoLoadingPage({
              init: {
                isLogined: true
              }
            });
          } else {
            NGame.pageMgr.openEntryPage(BundleName.DEFAULT, {
              isLogined: true
            }); // 原生端需要走Update 热更页面
          }

          this.closeAndDestroy();
          NGame.pageMgr.closeEntryPage(BundleName.HALL);
        };
        return RegDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "containNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "contentNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "regBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "guestLoginBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "agreenPolicyNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lineOrNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "agreenPolicyBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "agreenPolicySelTag", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pwd1ShowTypeBtn", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "pwd1HideIcon", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "pwd1ShowIcon", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "pwd2ShowTypeBtn", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "pwd2HideIcon", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "pwd2ShowIcon", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "userNameEditBoxNode", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "pwd1EditBoxNode", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "pwd2EditBoxNode", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "inviteCodeNode", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "inviteCodeEditBoxNode", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResetPwdDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './EncryPlus.ts', './MKViewBase.ts', './NetConstant.ts', './NGame.ts', './CooldownManager.ts', './HttpPbFunc.ts', './PlatformUtils.ts', './LoginUtils.ts', './GameDataMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, UITransform, Label, EditBox, StorageKey, inject, encryPlus, MKViewBase, CMD_SUCCESS, NGame, CooldownManager, HttpPbFunc, isResponseValid, PlatformUtils, LoginUtils, gameDataMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UITransform = module.UITransform;
      Label = module.Label;
      EditBox = module.EditBox;
    }, function (module) {
      StorageKey = module.StorageKey;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      encryPlus = module.encryPlus;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      CooldownManager = module.CooldownManager;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      LoginUtils = module.LoginUtils;
    }, function (module) {
      gameDataMgr = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24;
      cclegacy._RF.push({}, "ede2aqfCdlGgIaFopz1Ia3B", "ResetPwdDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 重置密码弹窗
       */
      var ResetPwdDialog = exports('ResetPwdDialog', (_dec = ccclass('ResetPwdDialog'), _dec2 = inject("content/btn_close/", Node), _dec3 = inject("content/label_title/", Node), _dec4 = inject("content/node_content/confirmBtn/", Node), _dec5 = inject("content/node_content/node_tips/btn_help/", Node), _dec6 = inject("content/node_content/node_sms/smsBtn/", Node), _dec7 = inject("content/node_content/node_username/", Node), _dec8 = inject("content/node_content/node_username/EditBox/", Node), _dec9 = inject("content/node_content/node_pwd_origin/", Node), _dec10 = inject("content/node_content/node_pwd_origin/EditBox/", Node), _dec11 = inject("content/node_content/node_pwd1/EditBox/", Node), _dec12 = inject("content/node_content/node_pwd2/EditBox/", Node), _dec13 = inject("content/node_content/node_phone/", Node), _dec14 = inject("content/node_content/node_phone/EditBox/", Node), _dec15 = inject("content/node_content/node_sms/", Node), _dec16 = inject("content/node_content/node_sms/smsBg/EditBox/", Node), _dec17 = inject("content/node_content/node_pwd_origin/btn_pwd_show/", Node), _dec18 = inject("content/node_content/node_pwd_origin/btn_pwd_show/icon_pwd_hide/", Node), _dec19 = inject("content/node_content/node_pwd_origin/btn_pwd_show/icon_pwd_show/", Node), _dec20 = inject("content/node_content/node_pwd1/btn_pwd_show/", Node), _dec21 = inject("content/node_content/node_pwd1/btn_pwd_show/icon_pwd_hide/", Node), _dec22 = inject("content/node_content/node_pwd1/btn_pwd_show/icon_pwd_show/", Node), _dec23 = inject("content/node_content/node_pwd2/btn_pwd_show/", Node), _dec24 = inject("content/node_content/node_pwd2/btn_pwd_show/icon_pwd_hide/", Node), _dec25 = inject("content/node_content/node_pwd2/btn_pwd_show/icon_pwd_show/", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(ResetPwdDialog, _MKViewBase);
        function ResetPwdDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titleLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "confirmBtn", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "helpBtn", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "smsBtn", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "userNameNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "userNameEditBoxNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdOriginNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdOriginEditBoxNode", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1EditBoxNode", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2EditBoxNode", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "phoneNode", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "phoneEditBoxNode", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "smsNode", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "smsEditBoxNode", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "originPwdShowTypeBtn", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdOriginHideIcon", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwdOriginShowIcon", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1ShowTypeBtn", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1HideIcon", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd1ShowIcon", _descriptor21, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2ShowTypeBtn", _descriptor22, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2HideIcon", _descriptor23, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pwd2ShowIcon", _descriptor24, _assertThisInitialized(_this));
          _this.userNameEditBox = null;
          _this.pwdOriginEditBox = null;
          _this.pwd1EditBox = null;
          _this.pwd2EditBox = null;
          _this.phoneEditBox = null;
          _this.smsEditBox = null;
          _this.isChangePwdDialog = false;
          return _this;
        }
        var _proto = ResetPwdDialog.prototype;
        // 当前弹框场景类型是否是修改密码弹窗（个人信息页面打开），默认是重置密码弹框（登录页面打开）
        _proto.create = function create() {
          // this.allNode = UIController.getAllChildrenMap(this.node);
          this.initVisible(); // 放create函数中才能保证UI组件位置显示不会随着底图大小变化而错位
        };

        _proto.initVisible = function initVisible() {
          this.isChangePwdDialog = gameDataMgr.isChangePwdDialog;
          var contentTransform = this.node.child('content').getComponent(UITransform);
          var height;
          if (this.isChangePwdDialog) {
            // 修改密码弹框有一些组件不需要显示
            gameDataMgr.isChangePwdDialog = false;
            height = 655;
            this.phoneNode.active = false;
            this.userNameNode.active = false;
            this.smsNode.active = false;
            this.pwdOriginNode.active = true;
            this.titleLabel.getComponent(Label).string = 'Change password'.i18nStr();
          } else {
            height = 1050;
            this.pwdOriginNode.active = false;
            this.phoneNode.active = true;
            this.userNameNode.active = true;
            this.smsNode.active = true;
            this.titleLabel.getComponent(Label).string = 'Reset password'.i18nStr();
          }
          contentTransform.height = height;
        };
        _proto.onLoad = function onLoad() {};
        _proto.open = function open() {
          this.initView();
          this.addClickEvent();
        };
        _proto.initView = function initView() {
          var _this$initData, _gameDataMgr$userInfo;
          this.userNameEditBox = this.userNameEditBoxNode.getComponent(EditBox);
          this.pwdOriginEditBox = this.pwdOriginEditBoxNode.getComponent(EditBox);
          this.pwd1EditBox = this.pwd1EditBoxNode.getComponent(EditBox);
          this.pwd2EditBox = this.pwd2EditBoxNode.getComponent(EditBox);
          this.phoneEditBox = this.phoneEditBoxNode.getComponent(EditBox);
          this.smsEditBox = this.smsEditBoxNode.getComponent(EditBox);
          var userName = ((_this$initData = this.initData) == null ? void 0 : _this$initData.userName) || ((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixAccount) || "";
          this.userNameEditBox.string = userName;
          this.userNameEditBox.enabled = false;
          if (this.isChangePwdDialog) {
            this.pwd1EditBox.placeholder = 'Please input new password'.i18nStr();
          } else {
            this.pwd1EditBox.placeholder = 'Please input the password'.i18nStr();
          }
        };
        _proto.addClickEvent = function addClickEvent() {
          var _this2 = this;
          this.onClicked(this.closeBtn, function () {
            _this2.closeAndDestroy();
          });
          this.onClicked(this.confirmBtn, function () {
            _this2.onClickConfirmBtn();
          });
          this.onClicked(this.helpBtn, function () {
            _this2.onClickHelpBtn();
          }, true, 1.0, false);
          this.onClicked(this.originPwdShowTypeBtn, function () {
            _this2.onClickOriginShowTypeBtn();
          });
          this.onClicked(this.pwd1ShowTypeBtn, function () {
            _this2.onClickPwd1ShowTypeBtn();
          });
          this.onClicked(this.pwd2ShowTypeBtn, function () {
            _this2.onClickPwd2ShowTypeBtn();
          });
          this.onClicked(this.smsBtn, function () {
            _this2.sendPhoneCode();
          }, false, 2.0);
        };
        _proto.sendPhoneCode = function sendPhoneCode() {
          var _this3 = this;
          var phone = this.phoneEditBox.string.trim();
          if (phone.length == 0) {
            NGame.tips.toast("Please enter your phone number".i18nStr());
          } else {
            HttpPbFunc.pbfixSendSmsCodeReq(this.node, {
              pbfixType: 2,
              // 重置密码
              pbfixPhone: phone,
              pbfixTimezone: PlatformUtils.getTimeZone(),
              pbfixUid: 0
            }, function (result) {
              if (result.pbfixCode == CMD_SUCCESS) {
                _this3.smsBtn.getComponent(CooldownManager).onOtpBtnClick();
              }
            });
          }
        };
        _proto.onResetPwdFinished = /*#__PURE__*/function () {
          var _onResetPwdFinished = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(result, oriPassword) {
            var _this$initData2;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!((result == null ? void 0 : result.pbfixCode) != CMD_SUCCESS)) {
                    _context.next = 3;
                    break;
                  }
                  NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Reset password failed".i18nStr());
                  return _context.abrupt("return");
                case 3:
                  this.savePwd(oriPassword);
                  NGame.tips.toast("Reset password success".i18nStr());

                  // 关闭弹框，更新登录页面
                  this.closeAndDestroy();
                  (_this$initData2 = this.initData) == null || _this$initData2.onActClose == null || _this$initData2.onActClose();
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onResetPwdFinished(_x, _x2) {
            return _onResetPwdFinished.apply(this, arguments);
          }
          return onResetPwdFinished;
        }();
        _proto.onClickHelpBtn = function onClickHelpBtn() {
          PlatformUtils.showLiveChat();
        };
        _proto.onClickOriginShowTypeBtn = function onClickOriginShowTypeBtn() {
          this.pwdOriginHideIcon.active = !this.pwdOriginHideIcon.active;
          this.pwdOriginShowIcon.active = !this.pwdOriginShowIcon.active;
          this.switchPwdShowType(this.pwdOriginEditBox, !this.pwdOriginHideIcon.active);
        };
        _proto.onClickPwd1ShowTypeBtn = function onClickPwd1ShowTypeBtn() {
          this.pwd1HideIcon.active = !this.pwd1HideIcon.active;
          this.pwd1ShowIcon.active = !this.pwd1ShowIcon.active;
          this.switchPwdShowType(this.pwd1EditBox, !this.pwd1HideIcon.active);
        };
        _proto.onClickPwd2ShowTypeBtn = function onClickPwd2ShowTypeBtn() {
          this.pwd2HideIcon.active = !this.pwd2HideIcon.active;
          this.pwd2ShowIcon.active = !this.pwd2ShowIcon.active;
          this.switchPwdShowType(this.pwd2EditBox, !this.pwd2HideIcon.active);
        };
        _proto.switchPwdShowType = function switchPwdShowType(editBox, isShowPassword) {
          if (isShowPassword) {
            // 显示明文
            editBox.inputFlag = EditBox.InputFlag.DEFAULT;
          } else {
            // 密码模式（小黑点）
            editBox.inputFlag = EditBox.InputFlag.PASSWORD;
          }
        };
        _proto.onClickConfirmBtn = function onClickConfirmBtn() {
          if (!this.verifyInput()) {
            return;
          }
          if (this.isChangePwdDialog) {
            this.pbfixChangePasswordReq();
          } else {
            this.pbfixResetPasswordReq();
          }
        };
        _proto.verifyInput = function verifyInput() {
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var confirmPassword = this.pwd2EditBox.string.trim();

          // 正则：开头到结尾，只能是 字母/数字/下划线，长度 6~20
          if (!this.isChangePwdDialog && !LoginUtils.validateUsername(account)) {
            return false;
          }

          // 修改密码弹窗需要输入旧密码
          var originPassword = this.pwdOriginEditBox.string.trim();
          if (this.isChangePwdDialog && !LoginUtils.validatePwd(originPassword)) {
            return false;
          }
          if (!LoginUtils.validatePwd(oriPassword)) {
            return false;
          }
          if (!LoginUtils.validateTwoPwd(oriPassword, confirmPassword)) {
            return false;
          }

          // 修改密码场景验证到这一步就算通过了
          if (this.isChangePwdDialog) {
            return true;
          }
          var phoneNum = this.phoneEditBox.string.trim();
          var otp = this.smsEditBox.string.trim();
          if (phoneNum.length == 0 || otp.length == 0) {
            NGame.tips.toast("Please enter your phone number and verification code".i18nStr());
            return false;
          }
          return true;
        };
        _proto.pbfixChangePasswordReq = function pbfixChangePasswordReq() {
          var _gameDataMgr$userInfo2,
            _this4 = this;
          var oldOriPassword = this.pwdOriginEditBox.string.trim();
          var newOriPassword = this.pwd1EditBox.string.trim();
          var md5OldPassword = encryPlus.hash256(oldOriPassword); // hash 256
          var md5NewPassword = encryPlus.hash256(newOriPassword); // hash 256

          var reqParams = {
            pbfixAccount: ((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixAccount) || "",
            pbfixOldPwd: md5OldPassword,
            pbfixNewPwd: md5NewPassword
          };
          HttpPbFunc.pbfixChangePasswordReq(this.node, reqParams, function (result) {
            if (isResponseValid(result, "Change password failed".i18nStr())) {
              NGame.tips.toast("Change password success".i18nStr());

              // 更新本地密码
              _this4.savePwd(newOriPassword);
              _this4.closeAndDestroy();
            }
          });
        };
        _proto.pbfixResetPasswordReq = function pbfixResetPasswordReq() {
          var _this5 = this;
          var account = this.userNameEditBox.string.trim();
          var oriPassword = this.pwd1EditBox.string.trim();
          var md5Password = encryPlus.hash256(oriPassword); // hash 256
          var phoneNum = this.phoneEditBox.string.trim();
          var otp = this.smsEditBox.string.trim();
          var reqParams = {
            pbfixPhone: phoneNum,
            pbfixOtp: otp,
            pbfixAccount: account,
            pbfixNewPwd: md5Password
          };
          HttpPbFunc.pbfixResetPasswordReq(this.node, reqParams, function (result) {
            _this5.onResetPwdFinished(result, oriPassword);
          });
        };
        _proto.savePwd = function savePwd(pwd) {
          var isSavePwd = NGame.storage.getBoolean(StorageKey.REMENBER_PWD, true);
          if (isSavePwd) {
            NGame.storage.set(StorageKey.INPUT_PASSWORD, pwd);
          }
        };
        return ResetPwdDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "confirmBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "helpBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "smsBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "userNameNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "userNameEditBoxNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pwdOriginNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "pwdOriginEditBoxNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "pwd1EditBoxNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pwd2EditBoxNode", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "phoneNode", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "phoneEditBoxNode", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "smsNode", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "smsEditBoxNode", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "originPwdShowTypeBtn", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "pwdOriginHideIcon", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "pwdOriginShowIcon", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "pwd1ShowTypeBtn", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "pwd1HideIcon", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "pwd1ShowIcon", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "pwd2ShowTypeBtn", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "pwd2HideIcon", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "pwd2ShowIcon", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/login', 'chunks:///_virtual/login'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});