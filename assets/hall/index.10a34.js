System.register("chunks:///_virtual/ActivityJumper.ts", ['cc', './NGame.ts', './WebApiEnums.ts', './PlatformUtils.ts', './BankruptcyAct.ts', './CheckinAct.ts', './Turntable.ts', './VipActivity.ts', './WeeklyCardAct.ts', './BetStatistcisPage.ts', './BindPhoneDialog.ts', './FirstDeposit.ts', './HelpPage.ts', './LimitedTimeOffer.ts', './NetConstant.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './UIHelper.ts', './MKExport.ts', './Constant.ts', './GoogleAnatytics.ts'], function (exports) {
  var cclegacy, NGame, pbfixActionType, PlatformUtils, BankruptcyAct, CheckinAct, Turntable, VipActivity, WeeklyCardAct, BetStatistcisPage, BindPhoneDialog, FirstDeposit, HelpPage, LimitedTimeOffer, CMD_SUCCESS, gameDataMgr, HttpPbFunc, UIHelper, UIPath, gloEvent, EventName, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      pbfixActionType = module.pbfixActionType;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      BankruptcyAct = module.BankruptcyAct;
    }, function (module) {
      CheckinAct = module.CheckinAct;
    }, function (module) {
      Turntable = module.Turntable;
    }, function (module) {
      VipActivity = module.VipActivity;
    }, function (module) {
      WeeklyCardAct = module.WeeklyCardAct;
    }, function (module) {
      BetStatistcisPage = module.BetStatistcisPage;
    }, function (module) {
      BindPhoneDialog = module.BindPhoneDialog;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      HelpPage = module.HelpPage;
    }, function (module) {
      LimitedTimeOffer = module.LimitedTimeOffer;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e7580wc7ytI2bGRAGn3uana", "ActivityJumper", undefined);
      var ActivityJumper = exports('ActivityJumper', /*#__PURE__*/function () {
        function ActivityJumper() {}
        ActivityJumper.open = function open(act) {
          switch (act.pbfixActionType) {
            case pbfixActionType.pbfixACTION_TYPE_OPEN_URL:
              // OpenUrl

              break;
            case pbfixActionType.pbfixACTION_TYPE_OPEN_GAME_PAGE:
              // Open Page
              this.openPage(act);
              break;
          }
        };
        ActivityJumper.openPage = function openPage(act) {
          var actionParams = act.pbfixActionParams;

          // 不需要登录就能进入的页面列表
          var noRegOpenList = ['13', '14'];
          if (gameDataMgr.isGoStraightToHall && !noRegOpenList.includes(actionParams)) {
            GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
            gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE); // 引导到登录页面
            return;
          }
          switch (actionParams) {
            case "2":
              // 首充页面
              GoogleAnalytics.track(GAEvent.FIRST_RECHARGE_270);
              NGame.uiManage.open(FirstDeposit);
              break;
            case "4":
              // 限时特惠充值活动
              UIHelper.openUI(LimitedTimeOffer, UIPath.LimitedTimeOffer); // 限时特惠充值活动
              break;
            case "5":
              // VIP 页面
              // NGame.uiManage.open(VipActivity)
              UIHelper.openUI(VipActivity, UIPath.VipActivity);
              break;
            case "7":
              // 转盘充值活动
              NGame.loading.show(null, 2.0);
              HttpPbFunc.pbfixWheelActivityInfoReq(null, function (result) {
                NGame.loading.hide();
                if (result.pbfixCode == CMD_SUCCESS) {
                  // NGame.uiManage.open(Turntable) 
                  UIHelper.openUI(Turntable, UIPath.Turntable);
                }
              });
              break;
            case "8":
              // 日常免费签到页面
              UIHelper.openUI(CheckinAct, UIPath.CheckinAct);
              break;
            case "9":
              // 周卡页面
              UIHelper.openUI(WeeklyCardAct, UIPath.WeeklyCardAct);
              break;
            case "10":
              // 绑定手机页面
              UIHelper.openUI(BindPhoneDialog, UIPath.BindPhoneDialog);
              break;
            case "11":
              // 破产补助页面
              UIHelper.openUI(BankruptcyAct, UIPath.BankruptcyAct);
              break;
            case "12":
              // 牌局/下注 历史
              UIHelper.openUI(BetStatistcisPage, UIPath.BetStatistcisPage);
              break;
            case "13":
              // 帮助中心页面  
              GoogleAnalytics.track(GAEvent.DIALOG_HELP);
              UIHelper.openUI(HelpPage, UIPath.HelpPage);
              break;
            case "14":
              // 客服页面
              PlatformUtils.showLiveChat();
              break;
          }
        };
        return ActivityJumper;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AvatarItemNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, BundleName, EventName, StorageKey, gloEvent, MKStaticViewBase, NGame, gameDataMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
    }, function (module) {
      BundleName = module.BundleName;
      EventName = module.EventName;
      StorageKey = module.StorageKey;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "c7f3cKyJp5FSqAORX2YjxVB", "AvatarItemNode", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 大厅头像选择器的单个头像项，基本头像+边框（选中状态才显示）
       */
      var AvatarItemNode = exports('AvatarItemNode', (_dec = ccclass('AvatarItemNode'), _dec2 = property(Node), _dec3 = property(Sprite), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(AvatarItemNode, _MKStaticViewBase);
        function AvatarItemNode() {
          var _this;
          _this = _MKStaticViewBase.call(this) || this;
          _initializerDefineProperty(_this, "avatarSpriteNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "avatarSprite", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "selTagNode", _descriptor3, _assertThisInitialized(_this));
          _this.avatarIndex = "1";
          _this.onReqEditAvatar = null;
          return _this;
        }
        var _proto = AvatarItemNode.prototype;
        _proto.initUI = function initUI(avatarIndex, onReqEditAvatar) {
          var _this2 = this;
          this.avatarIndex = avatarIndex.toString();
          this.onReqEditAvatar = onReqEditAvatar;
          this.avatarSpriteNode.loadImg("UserInfo/img/avatar/avatar_" + avatarIndex, BundleName.HALL, this.node, function (err, spriteFrame) {
            if (err) {
              return;
            }
            _this2.initTouchEvent();
            _this2.onMsg(EventName.ON_AVATAR_UPDATE, _this2.onAvatarUpdate);
          });
        };
        _proto.initTouchEvent = function initTouchEvent() {
          var _this3 = this;
          this.onClicked(this.node, function () {
            if (_this3.selTagNode.active) {
              return;
            }
            _this3.freshLocalUI();
            _this3.onReqEditAvatar(Number(_this3.avatarIndex));
            // 保存状态，当前玩家已修改过头像
            NGame.storage.set(StorageKey.IS_AVATAR_MODIFIED, true);
          }, false, 1.0, true);
        };
        _proto.setSelect = function setSelect(isSelect) {
          if (isSelect === void 0) {
            isSelect = false;
          }
          this.selTagNode.active = isSelect;
        }

        // 优先先刷新本地UI
        ;

        _proto.freshLocalUI = function freshLocalUI() {
          gameDataMgr.userInfo.pbfixAvatar = this.avatarIndex.toString();
          gloEvent.emit(EventName.ON_GET_USER_INFO); // 刷新个人信息框和大厅的头像
          gloEvent.emit(EventName.ON_AVATAR_UPDATE); // 刷新当前弹框的头像选择tag
          NGame.tips.toast("Profile update success".i18nStr());
        };
        _proto.onAvatarUpdate = function onAvatarUpdate() {
          var _gameDataMgr$userInfo, _gameDataMgr$userInfo2;
          this.setSelect(Number(this.avatarIndex) === Number((_gameDataMgr$userInfo = (_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixAvatar) != null ? _gameDataMgr$userInfo : "12"));
        };
        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.ON_AVATAR_UPDATE, this.onAvatarUpdate);
        };
        return AvatarItemNode;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "avatarSpriteNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "avatarSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selTagNode", [_dec4], {
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

System.register("chunks:///_virtual/AvatarSelDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './AvatarItemNode.ts', './GameDataMgr.ts', './Constant.ts', './MKExport.ts', './HttpPbFunc.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, instantiate, isValid, MKViewBase, AvatarItemNode, gameDataMgr, EventName, gloEvent, HttpPbFunc, isResponseValid;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      isValid = module.isValid;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      AvatarItemNode = module.AvatarItemNode;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "7de58wUwE1OhJvSlGLUEzHM", "AvatarSelDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MAX_AVATAR_INDEX = 12;
      var AvatarSelDialog = exports('AvatarSelDialog', (_dec = ccclass('AvatarSelDialog'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(AvatarSelDialog, _MKViewBase);
        function AvatarSelDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "layoutNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemPb", _descriptor3, _assertThisInitialized(_this));
          _this.originSelIndex = 0;
          // 当前初始选中的头像，用于修改失败后还原
          _this.reqEditAvatarIndex = 0;
          // 真实发起请求的头像索引
          _this.reqEditAvatarScheduledCallback = null;
          return _this;
        }
        var _proto = AvatarSelDialog.prototype;
        // 发起请求的定时器，用于取消已有的请求
        _proto.open = function open() {
          this.initTouchEvent();
          this.initAvatarList();
        };
        _proto.initTouchEvent = function initTouchEvent() {
          var _this2 = this;
          this.onClicked(this.closeBtn, function () {
            if (_this2.reqEditAvatarScheduledCallback) {
              _this2.removeScheduledCallback();
              _this2.reqEditAvatar();
            }
            _this2.closeAndDestroy();
          });
        };
        _proto.initAvatarList = function initAvatarList() {
          var _gameDataMgr$userInfo,
            _gameDataMgr$userInfo2,
            _this3 = this;
          var curSelIndex = Number((_gameDataMgr$userInfo = (_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixAvatar) != null ? _gameDataMgr$userInfo : "12");
          this.originSelIndex = curSelIndex;
          for (var i = 1; i < MAX_AVATAR_INDEX + 1; i++) {
            var itemNode = instantiate(this.itemPb);
            itemNode.name = i.toString();
            itemNode.parent = this.layoutNode;
            var itemComp = itemNode.getComponent(AvatarItemNode);
            itemComp.initUI(i, function (avatarIndex) {
              _this3.prepareReqEditAvatar(avatarIndex);
            });
            var isSel = i === curSelIndex;
            itemComp.setSelect(isSel);
          }
        }

        // 准备发起请求
        ;

        _proto.prepareReqEditAvatar = function prepareReqEditAvatar(avatarIndex) {
          this.reqEditAvatarIndex = avatarIndex;
          this.removeScheduledCallback();
          this.reqEditAvatarScheduledCallback = this.reqEditAvatar.bind(this);
          this.scheduleOnce(this.reqEditAvatarScheduledCallback, 2); // 延迟发送，避免同时发起多个请求
        };

        _proto.removeScheduledCallback = function removeScheduledCallback() {
          if (this.reqEditAvatarScheduledCallback) {
            this.unschedule(this.reqEditAvatarScheduledCallback);
            this.reqEditAvatarScheduledCallback = null;
          }
        }

        // 更新AvatarList
        ;

        _proto.updateAvatarList = function updateAvatarList() {
          var _gameDataMgr$userInfo3, _gameDataMgr$userInfo4;
          var curSelIndex = Number((_gameDataMgr$userInfo3 = (_gameDataMgr$userInfo4 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo4.pbfixAvatar) != null ? _gameDataMgr$userInfo3 : "12");
          this.originSelIndex = curSelIndex;
          for (var i = 1; i < MAX_AVATAR_INDEX + 1; i++) {
            var itemNode = this.layoutNode.getChildByName(i.toString());
            var itemComp = itemNode.getComponent(AvatarItemNode);
            itemComp.setSelect(i === curSelIndex);
          }
        };
        _proto.reqEditAvatar = function reqEditAvatar() {
          var _this4 = this;
          // 限制请求频率
          // repeated int32 types = 2; // 更新类型（支持一次改多个）：1 昵称 | 2 头像 | 3 性别
          var params = {
            pbfixTypes: [2],
            pbfixAvatar: this.reqEditAvatarIndex.toString()
          };
          HttpPbFunc.pbfixUpdateUserInfoReq(null, params, function (result) {
            if (isResponseValid(result, "Profile update error".i18nStr())) ;else {
              // 头像修改回退
              gameDataMgr.userInfo.pbfixAvatar = _this4.originSelIndex.toString();
              gloEvent.emit(EventName.ON_GET_USER_INFO); // 刷新个人信息框和大厅的头像
              gloEvent.emit(EventName.ON_AVATAR_UPDATE); // 刷新当前弹框的头像选择tag
              if (isValid(_this4.node)) {
                _this4.updateAvatarList();
              }
            }
          });
        };
        return AvatarSelDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layoutNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPb", [_dec4], {
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

System.register("chunks:///_virtual/BankruptcyAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIHelper.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts', './WeeklyCardAct.ts', './GoogleAnatytics.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, UIHelper, UIPath, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, pbfixClaimedStatus, PayUtils, safetyNum, Utils, WeeklyCardAct, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixClaimedStatus = module.pbfixClaimedStatus;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      WeeklyCardAct = module.WeeklyCardAct;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "73259u0vLhBx51TUj13Ri9f", "BankruptcyAct", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      /**
       * 破产补助弹框
       */
      var BankruptcyAct = exports('BankruptcyAct', (_dec = ccclass('BankruptcyAct'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BankruptcyAct, _MKViewBase);
        function BankruptcyAct() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = BankruptcyAct.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          var _this2 = this;
          GoogleAnalytics.track(GAEvent.DIALOG_RESCUE);
          this.onClicked(this.allNode.closeBtn, function () {
            _this2.closeView();
          });
          this.onClicked(this.allNode.btnTips, function () {
            NGame.dialog.show({
              text: "RescueFundRule".i18nStr(),
              showAnim: true,
              confirmText: "Confirm".i18nStr(),
              onConfirm: function onConfirm() {}
            });
          });
          this.initUi();
        };
        _proto.initUi = function initUi() {
          var _gameDataMgr$userInfo,
            _gameDataMgr$userInfo2,
            _this3 = this,
            _gameDataMgr$userInfo3;
          var defaultRescueList = gameDataMgr.hallConf.pbfixBankruptcyConfig;
          var weeklyCardRescueList = gameDataMgr.hallConf.pbfixPurchasedWeeklyCardBankruptcyConfig;
          var dailyBankruptcyClaimCount = safetyNum(gameDataMgr.hallConf.pbfixDailyBankruptcyClaimCount);
          var bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
          var remainAidTimes = safetyNum(((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixRemainAidTimes) || 0);
          this.allNode.desc.setText("Rescue desc".i18nStr([Utils.changeMoneyUnit(bankruptcyLine.cToRateNum(), 1), dailyBankruptcyClaimCount.toString()]));
          var claimNum = dailyBankruptcyClaimCount - remainAidTimes;
          var str = "Claim".i18nStr() + (" (" + claimNum + "/" + dailyBankruptcyClaimCount + " Today)");
          this.allNode.count.setText(str);
          var canGet = PayUtils.hasRecharge && safetyNum(((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixBalance) || 0) < bankruptcyLine && remainAidTimes > 0;
          this.allNode.GetBtn.getComponent(Sprite).grayscale = !canGet;
          if (canGet) {
            this.onClicked(this.allNode.GetBtn, function () {
              _this3.getBonus();
            });
          } else {
            this.offClicked(this.allNode.GetBtn);
          }
          this.allNode.Lock.active = false;
          var dayIx = 0;
          if ((_gameDataMgr$userInfo3 = gameDataMgr.userInfo) != null && _gameDataMgr$userInfo3.pbfixIsPurchasedWeeklyCard) {
            gameDataMgr.weeklyCardData.pbfixClaimItems.forEach(function (card, idx) {
              if (card.pbfixStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE || card.pbfixStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED) {
                dayIx = idx;
              }
            });
          } else {
            UIController.popUp(this.allNode.Lock);
            this.onClicked(this.allNode.lockBtn, function () {
              _this3.closeView();
              // NGame.uiManage.open(WeeklyCardAct)
              UIHelper.openUI(WeeklyCardAct, UIPath.WeeklyCardAct);
            });
          }
          this.allNode.price1.setText(Utils.changeMoneyUnit(defaultRescueList[0].cToRateNum(), 1));
          this.allNode.price2.setText(Utils.changeMoneyUnit(weeklyCardRescueList[dayIx].cToRateNum(), 1));
        };
        _proto.getBonus = function getBonus() {
          var _this4 = this;
          HttpPbFunc.pbfixBankruptcyBenefitReq(this.node, function (result) {
            _this4.initUi();
          });
        };
        _proto.closeView = function closeView() {
          this.close();
        };
        return BankruptcyAct;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BankruptcyGuide.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './NodeExt.ts', './MKExport.ts', './MKViewBase.ts', './GameDataMgr.ts', './WebApiEnums.ts', './PayUtils.ts', './BannerView.ts', './ActivityJumper.ts', './SwitchTabData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, EventName, HomeTabIndex, TabEvent, inject, PosType, gloEvent, MKViewBase, gameDataMgr, pbfixActionType, PayUtils, BannerView, ActivityJumper, SwitchTabData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      PosType = module.PosType;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      pbfixActionType = module.pbfixActionType;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      ActivityJumper = module.ActivityJumper;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "55ec6ATkiJPQYLiOCaPq/FW", "BankruptcyGuide", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BankruptcyGuide = exports('BankruptcyGuide', (_dec = ccclass('BankruptcyGuide'), _dec2 = inject("content/bg", Node), _dec3 = inject("content/bg/bannerRoot", Node), _dec4 = inject("content/bg/bannerRoot/BannerView", Node), _dec5 = inject("content/bg/bannerRoot/depotiBanner", Node), _dec6 = inject("content/btnClose", Node), _dec7 = inject("content/bg/bottomBtns/btnDeposit", Node), _dec8 = inject("content/bg/bottomBtns/btnEnterGame", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BankruptcyGuide, _MKViewBase);
        function BankruptcyGuide() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "bg", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bannerRoot", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bannerView", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "depotiBanner", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnClose", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnEnterGame", _descriptor7, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = BankruptcyGuide.prototype;
        _proto.onLoad = function onLoad() {};
        _proto.open = function open() {
          var _this2 = this;
          // 已充值用户当前可以领破产补助
          if (PayUtils.canGetRescueFunds && gameDataMgr.bankruptcyAct != null) {
            var act = JSON.parse(JSON.stringify(gameDataMgr.bankruptcyAct));
            act.pbfixTitle = "  "; // 必须留空不能删
            act.pbfixSubTitle = "Click to claim Rescue Funds".i18nStr();
            act.pbfixActionType = pbfixActionType.pbfixACTION_TYPE_OPEN_GAME_PAGE;
            this.bannerView.active = true;
            this.bannerView.getComponent(BannerView).customBannerConfig = {
              titleFntIdx: -1,
              titleFntSize: 10,
              subTitleFntIdx: 3,
              subTitleFntSize: 55,
              showCountDown: false
            };
            this.bannerView.getComponent(BannerView).setData(act);
            this.onClicked(this.bannerView, function () {
              ActivityJumper.open(act);
              _this2.closeAndDestroy();
            });
            this.onClicked(this.btnDeposit, function () {
              gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                event: TabEvent.DEPOSIT_DEPOSIT
              }));
              _this2.closeAndDestroy();
            });
          } else if (!PayUtils.hasRecharge && !PayUtils.isFirstPayActBuyed && !PayUtils.isFirstPayActFinished && gameDataMgr.firstPayAct) {
            // 首冲活动

            this.bannerView.active = true;
            this.bannerView.getComponent(BannerView).setData(gameDataMgr.firstPayAct);
            this.onClicked(this.bannerView, function () {
              ActivityJumper.open(gameDataMgr.firstPayAct);
              _this2.closeAndDestroy();
            });
            this.onClicked(this.btnDeposit, function () {
              ActivityJumper.open(gameDataMgr.firstPayAct);
              _this2.closeAndDestroy();
            });
          } else if (PayUtils.hasRecharge && !PayUtils.isLimitedTimeRechargeActFinished && gameDataMgr.limitedTimePayAct) {
            // 限时特惠充值

            this.bannerView.active = true;
            this.bannerView.getComponent(BannerView).setData(gameDataMgr.limitedTimePayAct);
            this.onClicked(this.bannerView, function () {
              ActivityJumper.open(gameDataMgr.limitedTimePayAct);
              _this2.closeAndDestroy();
            });
            this.onClicked(this.btnDeposit, function () {
              ActivityJumper.open(gameDataMgr.limitedTimePayAct);
              _this2.closeAndDestroy();
            });
          } else {
            // 跳转常规充值

            this.depotiBanner.active = true;
            this.onClicked(this.depotiBanner, function () {
              gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                event: TabEvent.DEPOSIT_DEPOSIT
              }));
              _this2.closeAndDestroy();
            });
            this.onClicked(this.btnDeposit, function () {
              gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                event: TabEvent.DEPOSIT_DEPOSIT
              }));
              _this2.closeAndDestroy();
            });
          }
          this.onClicked(this.btnEnterGame, function () {
            var _this2$initData;
            (_this2$initData = _this2.initData) == null || _this2$initData.onEnterGame == null || _this2$initData.onEnterGame();
            _this2.closeAndDestroy();
          });
          this.scheduleOnce(function () {
            _this2.btnClose.position = v3(_this2.bg.pos(PosType.RIGHT).x - 30, _this2.bg.pos(PosType.TOP).y + 50);
            _this2.popUpAndClicked(_this2.btnClose, _this2.closeAndDestroy.bind(_this2));
          }, 0.1);
        };
        return BankruptcyGuide;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bannerRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bannerView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "depotiBanner", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnEnterGame", [_dec8], {
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

System.register("chunks:///_virtual/BannerView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './WebApiEnums.ts', './Utils.ts', './Reddot.ts', './GameDataMgr.ts', './MKExport.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Font, Node, Mask, Graphics, Label, Component, RedDotType, BundleName, EventName, inject, pbfixActivityPageType, Utils, Reddot, gameDataMgr, gloEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Font = module.Font;
      Node = module.Node;
      Mask = module.Mask;
      Graphics = module.Graphics;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      RedDotType = module.RedDotType;
      BundleName = module.BundleName;
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      pbfixActivityPageType = module.pbfixActivityPageType;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      Reddot = module.Reddot;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      gloEvent = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "256041mMRdECYjrGlzY13Zf", "BannerView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BannerView = exports('BannerView', (_dec = ccclass('BannerView'), _dec2 = property({
        type: [Font]
      }), _dec3 = property({
        type: Node
      }), _dec4 = inject("bgImgMask", Node), _dec5 = inject("bgImgMask/bgImg", Node), _dec6 = inject("layout/title", Node), _dec7 = inject("layout/subTitle", Node), _dec8 = inject("layout/countDown", Node), _dec9 = inject("tipWheel", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BannerView, _Component);
        function BannerView() {
          var _this$bannerConfig;
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "fonts", _descriptor, _assertThisInitialized(_this));
          // 字体资源数组
          _initializerDefineProperty(_this, "timeLabs", _descriptor2, _assertThisInitialized(_this));
          // @inject("bgImg", Node)
          // private bgImg: Node = null!;
          _initializerDefineProperty(_this, "bgImgMask", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgImg", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "title", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "subTitle", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "countDown", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tipWheel", _descriptor8, _assertThisInitialized(_this));
          _this.customBannerConfig = void 0;
          _this.bannerConfig = (_this$bannerConfig = {}, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_FIRST_RECHARGE.toString()] = {
            titleFntIdx: 1,
            titleFntSize: 32,
            subTitleFntIdx: 3,
            subTitleFntSize: 60,
            showCountDown: true
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_LIMITED_TIME_OFFER.toString()] = {
            titleFntIdx: -1,
            titleFntSize: 32,
            subTitleFntIdx: 3,
            subTitleFntSize: 70,
            showCountDown: true
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_VIP_ACTIVITY.toString()] = {
            titleFntIdx: 3,
            titleFntSize: 80,
            subTitleFntIdx: 3,
            subTitleFntSize: 32,
            showCountDown: false,
            redDotType: RedDotType.RED_DOT_VIP_ACTIVITY
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_WHEEL_ACTIVITY.toString()] = {
            titleFntIdx: 2,
            titleFntSize: 36,
            subTitleFntIdx: 3,
            subTitleFntSize: 80,
            showCountDown: false,
            redDotType: RedDotType.RED_DOT_WHEEL_ACTIVITY
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_SIGN_IN.toString()] = {
            titleFntIdx: -1,
            titleFntSize: 36,
            subTitleFntIdx: 3,
            subTitleFntSize: 60,
            showCountDown: false,
            redDotType: RedDotType.RED_DOT_DAILY_SIGN
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_WEEKLY_CARD.toString()] = {
            titleFntIdx: 2,
            titleFntSize: 35.9,
            subTitleFntIdx: 3,
            subTitleFntSize: 79.79,
            showCountDown: false,
            redDotType: RedDotType.RED_DOT_WEEKLY_CARD
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_BIND_PHONE.toString()] = {
            titleFntIdx: 1,
            titleFntSize: 32,
            subTitleFntIdx: 3,
            subTitleFntSize: 70,
            showCountDown: false
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_BANKRUPTCY.toString()] = {
            titleFntIdx: 3,
            titleFntSize: 36,
            subTitleFntIdx: 3,
            subTitleFntSize: 70,
            showCountDown: false
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_PLAY_HISTORY.toString()] = {
            titleFntIdx: -1,
            titleFntSize: 55,
            subTitleFntIdx: 3,
            subTitleFntSize: 60,
            showCountDown: false
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_HELP.toString()] = {
            titleFntIdx: -1,
            titleFntSize: 55,
            subTitleFntIdx: 3,
            subTitleFntSize: 60,
            showCountDown: false
          }, _this$bannerConfig[pbfixActivityPageType.pbfixPAGE_TYPE_LIVECHAT.toString()] = {
            titleFntIdx: -1,
            titleFntSize: 55,
            subTitleFntIdx: 3,
            subTitleFntSize: 0,
            showCountDown: false
          }, _this$bannerConfig);
          return _this;
        }
        var _proto = BannerView.prototype;
        _proto.setData = function setData(data, showRound) {
          var _this2 = this;
          if (showRound === void 0) {
            showRound = true;
          }
          var cfg = this.bannerConfig[data.pbfixActionParams];
          if (this.customBannerConfig) {
            cfg = this.customBannerConfig;
          }
          if (!cfg) {
            this.node.active = false;
            return;
          }
          this.bgImgMask.getComponent(Mask).enabled = showRound;
          this.bgImgMask.getComponent(Graphics).enabled = showRound;
          this.bgImg.loadUrlImg({
            url: data.pbfixImgUrl,
            placeholderPath: "common/img/bg_base_banner",
            placeholderBundle: BundleName.HALL,
            target: this.node,
            complete: function complete(error, sf) {
              _this2.onImgLoaded(data, cfg);
            }
          });
          this.initReddot(cfg);
        };
        _proto.initReddot = function initReddot(cfg) {
          var redDotType = cfg.redDotType;
          if (!redDotType) {
            return;
          }
          var reddotNode = this.node.child('Reddot');
          var reddotScript = reddotNode == null ? void 0 : reddotNode.getComponent(Reddot);
          if (!reddotNode || !reddotScript) {
            return;
          }
          reddotScript.setType(redDotType);

          // 从gameDataMgr.redDotSet中判断是否需要显示红点
          var isShow = gameDataMgr.redDotSet.has(redDotType);
          if (isShow) {
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: redDotType
            });
          }
        };
        _proto.onImgLoaded = function onImgLoaded(data, cfg) {
          if (data.pbfixTitle && data.pbfixTitle.length > 0) {
            var _data$pbfixTitle;
            this.title.active = true;
            if (cfg.titleFntIdx == -1) {
              this.title.getComponent(Label).useSystemFont = true;
              this.title.getComponent(Label).isBold = true;
              this.title.getComponent(Label).lineHeight = cfg.titleFntSize + 7;
            } else {
              this.title.getComponent(Label).useSystemFont = false;
              this.title.getComponent(Label).isBold = false;
              this.title.getComponent(Label).font = this.fonts[cfg.titleFntIdx];
              this.title.getComponent(Label).lineHeight = cfg.titleFntSize;
            }
            this.title.getComponent(Label).fontSize = cfg.titleFntSize;
            this.title.setText((_data$pbfixTitle = data.pbfixTitle) != null ? _data$pbfixTitle : "");
          } else {
            this.title.active = false;
          }
          if (data.pbfixSubTitle && data.pbfixSubTitle.length > 0) {
            var _data$pbfixSubTitle;
            this.subTitle.active = true;
            if (cfg.subTitleFntIdx == -1) {
              this.subTitle.getComponent(Label).useSystemFont = true;
              this.subTitle.getComponent(Label).lineHeight = cfg.subTitleFntSize + 7;
            } else {
              this.subTitle.getComponent(Label).useSystemFont = false;
              this.subTitle.getComponent(Label).font = this.fonts[cfg.titleFntIdx];
              this.subTitle.getComponent(Label).lineHeight = cfg.subTitleFntSize;
            }
            this.subTitle.getComponent(Label).font = this.fonts[cfg.subTitleFntIdx];
            this.subTitle.getComponent(Label).fontSize = cfg.subTitleFntSize;
            this.subTitle.setText((_data$pbfixSubTitle = data.pbfixSubTitle) != null ? _data$pbfixSubTitle : "");
          } else {
            this.subTitle.active = false;
          }
          this.countDown.active = cfg.showCountDown;
          if (this.countDown.active) {
            //倒计时
            var time = Utils.getLeftTime();
            Utils.timeCountdown3(this.timeLabs, time);
          }
          // if (
          //     data.actionParams == ActivityPageType.PAGE_TYPE_WHEEL_ACTIVITY.toString()
          //     && gameDataMgr.wheelActivityInfo.remainTimes > 0
          // ) {
          //     this.tipWheel.active = true;
          // }

          // todo 改成用红点提醒
          // this.tipWheel.active = data.pbfixActionParams == pbfixActivityPageType.pbfixPAGE_TYPE_WHEEL_ACTIVITY.toString()
          //     && gameDataMgr.wheelActivityInfo?.pbfixRemainTimes > 0;
        };

        return BannerView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fonts", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timeLabs", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bgImgMask", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bgImg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "subTitle", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "countDown", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "tipWheel", [_dec9], {
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

System.register("chunks:///_virtual/BaseChildPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, director, Canvas, UITransform, MKViewBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ce7725wXJJCLTJOFnlmAgM", "BaseChildPage", undefined);
      var BaseChildPage = exports('BaseChildPage', /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BaseChildPage, _MKViewBase);
        function BaseChildPage() {
          return _MKViewBase.apply(this, arguments) || this;
        }
        var _proto = BaseChildPage.prototype;
        _proto.onLoad = function onLoad() {
          var _director$getScene;
          // 由于MK框架生命周期有bug，页面父节点不是全屏高度时，页面高度在正常生命周期中会不正确，这里需要手动调用onLoad，重新确定高度
          var node_childPage = (_director$getScene = director.getScene()) == null || (_director$getScene = _director$getScene.getComponentInChildren(Canvas)) == null || (_director$getScene = _director$getScene.node) == null || (_director$getScene = _director$getScene.child("UIRoot")) == null || (_director$getScene = _director$getScene.child("HallPreb")) == null ? void 0 : _director$getScene.child("node_childPage");
          if (node_childPage) {
            this.node.getComponent(UITransform).height = node_childPage.contentSize().height;
          }
        };
        return BaseChildPage;
      }(MKViewBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseTabPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, MKViewBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95f7ecaA79KRYbSpTEovySu", "BaseTabPage", undefined);
      var BaseTabPage = exports('BaseTabPage', /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BaseTabPage, _MKViewBase);
        function BaseTabPage() {
          return _MKViewBase.apply(this, arguments) || this;
        }
        return BaseTabPage;
      }(MKViewBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BetStatistcisPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DatePicker.ts', './GloTitleBar.ts', './Constant.ts', './Decorators.ts', './VScrollView.ts', './MKViewBase.ts', './NGame.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Prefab, Node, UITransform, Label, Color, instantiate, js, DatePicker, GloTitleBar, EventName, inject, VirtualScrollView, MKViewBase, NGame, UIController, HttpPbFunc, pbfixMoneyType, safetyNum, Utils;
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
      Prefab = module.Prefab;
      Node = module.Node;
      UITransform = module.UITransform;
      Label = module.Label;
      Color = module.Color;
      instantiate = module.instantiate;
      js = module.js;
    }, function (module) {
      DatePicker = module.DatePicker;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixMoneyType = module.pbfixMoneyType;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "496adbEjz1Lp7Fgp9NUJwD0", "BetStatistcisPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BetStatistcisPage = exports('BetStatistcisPage', (_dec = ccclass('BetStatistcisPage'), _dec2 = property({
        type: Prefab
      }), _dec3 = inject("ScrollView/view/content/ListLayOut/listView", VirtualScrollView), _dec4 = inject("ScrollView/view/content/Topinfo/GloTitleBar", GloTitleBar), _dec5 = inject("ScrollView/view/content/Topinfo", Node), _dec6 = inject("ScrollView/view/content/ListLayOut", Node), _dec7 = inject("ScrollView/view/content/Topinfo/btnDatePicker", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BetStatistcisPage, _MKViewBase);
        function BetStatistcisPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "datePrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "listView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "Topinfo", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ListLayOut", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDatePicker", _descriptor6, _assertThisInitialized(_this));
          //日期控件
          _this.UIDatePickerPrefabNew = null;
          _this.allNode = null;
          _this.curPage = 1;
          _this.maxPage = 0;
          _this.time = 0;
          _this.dayIndx = 0;
          _this.curBetStaticList = [];
          _this.isloadingData = false;
          return _this;
        }
        var _proto = BetStatistcisPage.prototype;
        _proto.onLoad = function onLoad() {}

        // 将时间戳转换为年月日字符串
        ;

        _proto.getTime = function getTime(time) {
          var date = new Date(time);
          return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }

        // 将年月日转换为时间戳
        ;

        _proto.getTimestamp = function getTimestamp(year, month, day) {
          // 创建日期对象，注意月份是从0开始的
          var date = new Date(year, month, day);
          // 返回时间戳（毫秒）
          return date.getTime();
        };
        _proto.open = function open() {
          var _this2 = this;
          this.onClicked(this.btnDatePicker, this.initDatePicker.bind(this));
          this.ListLayOut.getComponent(UITransform).height = this.node.contentSize().height - this.Topinfo.contentSize().height - 10;
          this.gloTitleBar.initBar("Bet statistcis".i18nStr(), this.close);
          this.allNode = UIController.getAllChildrenMap(this.node);
          this.time = Date.now();
          this.allNode.riliLb.setText(this.getTime(this.time));
          this.listView.renderItemFn = function (item, index) {
            var element = _this2.curBetStaticList[index];
            item.child("bg").active = index % 2 == 0;
            item.child("Game").setText(element.pbfixGameName.ellipsis(10));
            item.child("totalbet").setText(safetyNum(element == null ? void 0 : element.pbfixBetAmount).cToRateNum());
            item.child("totalwagers").setText(safetyNum(element == null ? void 0 : element.pbfixWinAmount).cToRateNum());
            item.child("time").setText(Utils.formatTime(element.pbfixBetTime * 1000, "YYYY-MM-DD HH:mm:ss"));
            // let key = `Bonus` // Balance
            // if (element.pbfixMoneyType != pbfixMoneyType.pbfixMONEY_TYPE_UNDEFINED) {
            //     key = element.pbfixMoneyType == pbfixMoneyType.pbfixMONEY_TYPE_BALANCE ? `Balance` : `Bonus`
            // }
            item.child("type").setText((element.pbfixMoneyType == pbfixMoneyType.pbfixMONEY_TYPE_BALANCE ? "Balance" : "Bonus").i18nStr());
          };
          this.onClicked(this.allNode.todayDi, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!_this2.isloadingData) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  _this2.dayIndx = 0;
                  _this2.time = Date.now();
                  _this2.switchDay();
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
          this.onClicked(this.allNode.Yesterday_di, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!_this2.isloadingData) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  _this2.dayIndx = 1;
                  _this2.time = Date.now() - 24 * 60 * 60 * 1000;
                  _this2.switchDay();
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
          this.dayIndx = 0;
          this.curPage = 1;
          this.maxPage = 0;
          this.switchDay();
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        }

        /** 侧滑返回上一页 */;
        _proto.onEdgeSwipeBack = function onEdgeSwipeBack(targetNode) {
          if (this.ignoreEdgeSwipeBack(targetNode)) {
            return;
          }
          this.close();
        };
        _proto.switchDay = function switchDay() {
          this.allNode.todayDi.child("light").active = this.dayIndx == 0;
          this.allNode.Yesterday_di.child("light").active = this.dayIndx == 1;
          this.allNode.riliLb.setText(this.getTime(this.time));
          this.setPickerDate();
          this.updateInfo();
        };
        _proto.setPickerDate = function setPickerDate() {
          var _this$UIDatePickerPre;
          var d = new Date(this.time);
          (_this$UIDatePickerPre = this.UIDatePickerPrefabNew) == null || _this$UIDatePickerPre.getComponent(DatePicker).setDate(d.getFullYear(), d.getMonth(), d.getDate());
        };
        _proto.updateInfo = function updateInfo() {
          var _this3 = this;
          NGame.loading.show(null, null, false);
          this.allNode.nodata.active = false;
          this.listView.node.active = false;
          var params = {
            pbfixDate: Utils.formatTime(this.time, "YYYY-MM-DD"),
            pbfixPage: this.curPage
          };
          this.isloadingData = true;
          HttpPbFunc.pbfixGameLogReq(this.node, params, function (data) {
            var _data$pbfixLogs;
            if (data && ((_data$pbfixLogs = data.pbfixLogs) == null ? void 0 : _data$pbfixLogs.length) > 0) {
              _this3.curBetStaticList = data.pbfixLogs;
              _this3.maxPage = Math.ceil(data.pbfixTotalSize / 20);
              _this3.listView.node.active = true;
              _this3.listView.refreshList(_this3.curBetStaticList);
            } else {
              _this3.allNode.nodata.active = true;
              _this3.maxPage = 0;
              _this3.curPage = 1;
            }
            _this3.updateBottom();
            NGame.loading.hide();
            _this3.scheduleOnce(function () {
              _this3.isloadingData = false;
            }, 0.3);
          });
        };
        _proto.updateBottom = function updateBottom() {
          var _this4 = this;
          this.allNode.bottomInfo.active = this.maxPage > 0;
          if (this.maxPage > 0) {
            this.allNode["pageNode1"].active = false;
            this.allNode["pageNode2"].active = false;
            this.allNode["pageNode3"].active = false;
            this.allNode["pageNum1"].setText(this.curPage);
            this.allNode["pageNum2"].setText(this.curPage);
            this.allNode["pageNum3"].setText(this.curPage);
            this.onClicked(this.allNode["pageNode1"], function () {});
            this.onClicked(this.allNode["pageNode2"], function () {});
            this.onClicked(this.allNode["pageNode3"], function () {});
            if (this.maxPage == 1) {
              this.allNode["pageNode1"].active = true;
              this.allNode["pageNum1"].getComponent(Label).color = Color.WHITE;
            } else if (this.maxPage == 2) {
              this.allNode["pageNode1"].active = true;
              this.allNode["pageNode2"].active = true;
              this.allNode["pageNum1"].setText("1");
              this.allNode["pageNum2"].setText("2");
              this.allNode["pageNum1"].getComponent(Label).color = this.curPage == 1 ? Color.WHITE : new Color().fromHEX("#9F9586");
              this.allNode["pageNum2"].getComponent(Label).color = this.curPage == 2 ? Color.WHITE : new Color().fromHEX("#9F9586");
              var node = this.curPage == 1 ? this.allNode["pageNode1"] : this.allNode["pageNode2"];
              this.onClicked(node, function () {
                if (_this4.isloadingData) return;
                _this4.curPage = _this4.curPage == 1 ? 2 : 1;
                _this4.allNode.riliLb.setText(_this4.getTime(_this4.time));
                _this4.updateInfo();
              });
            } else {
              this.allNode["pageNode1"].active = true;
              this.allNode["pageNode2"].active = true;
              this.allNode["pageNode3"].active = true;
              this.allNode["pageNum1"].getComponent(Label).color = new Color().fromHEX("#9F9586");
              this.allNode["pageNum2"].getComponent(Label).color = new Color().fromHEX("#9F9586");
              this.allNode["pageNum3"].getComponent(Label).color = new Color().fromHEX("#9F9586");
              var node1 = null;
              var node2 = null;
              var page1 = null;
              var page2 = null;
              if (this.curPage == 1) {
                this.allNode["pageNum1"].setText(this.curPage);
                this.allNode["pageNum2"].setText(this.curPage + 1);
                this.allNode["pageNum3"].setText(this.curPage + 2);
                this.allNode["pageNum1"].getComponent(Label).color = Color.WHITE;
                node1 = this.allNode["pageNode2"];
                node2 = this.allNode["pageNode3"];
                page1 = this.curPage + 1;
                page2 = this.curPage + 2;
              } else if (this.curPage == this.maxPage) {
                this.allNode["pageNum1"].setText(this.curPage - 2);
                this.allNode["pageNum2"].setText(this.curPage - 1);
                this.allNode["pageNum3"].setText(this.curPage);
                this.allNode["pageNum3"].getComponent(Label).color = Color.WHITE;
                node1 = this.allNode["pageNode1"];
                node2 = this.allNode["pageNode2"];
                page1 = this.curPage - 2;
                page2 = this.curPage - 1;
              } else {
                this.allNode["pageNum1"].setText(this.curPage - 1);
                this.allNode["pageNum2"].setText(this.curPage);
                this.allNode["pageNum3"].setText(this.curPage + 1);
                this.allNode["pageNum2"].getComponent(Label).color = Color.WHITE;
                node1 = this.allNode["pageNode1"];
                node2 = this.allNode["pageNode3"];
                page1 = this.curPage - 1;
                page2 = this.curPage + 1;
              }
              this.onClicked(node1, function () {
                if (_this4.isloadingData) return;
                _this4.curPage = page1;
                _this4.allNode.riliLb.setText(_this4.getTime(_this4.time));
                _this4.updateInfo();
              });
              this.onClicked(node2, function () {
                if (_this4.isloadingData) return;
                _this4.curPage = page2;
                _this4.allNode.riliLb.setText(_this4.getTime(_this4.time));
                _this4.updateInfo();
              });
            }
            this.allNode.leftBtn.getChildByName("close").active = this.curPage <= 1;
            this.allNode.rightBtn.getChildByName("close").active = this.curPage >= this.maxPage;
            this.onClicked(this.allNode.leftBtn, function () {
              if (_this4.isloadingData) return;
              if (_this4.curPage > 1) {
                _this4.curPage--;
                _this4.allNode.riliLb.setText(_this4.getTime(_this4.time));
                _this4.updateInfo();
              }
            });
            this.onClicked(this.allNode.rightBtn, function () {
              if (_this4.isloadingData) return;
              if (_this4.curPage < _this4.maxPage) {
                _this4.curPage++;
                _this4.allNode.riliLb.setText(_this4.getTime(_this4.time));
                _this4.updateInfo();
              }
            });
          }
        }

        //日期控件操作
        ;

        _proto.initDatePicker = function initDatePicker() {
          var _this5 = this;
          if (this.UIDatePickerPrefabNew == null) {
            this.UIDatePickerPrefabNew = instantiate(this.datePrefab);
            this.setPickerDate();
            this.UIDatePickerPrefabNew.parent = this.node;
            this.UIDatePickerPrefabNew.active = true;
            // this.UIDatePickerPrefabNew.setPosition(new Vec3(0,0,0));

            this.UIDatePickerPrefabNew.getComponent(DatePicker).setPickDateCallback(function (year, month, day) {
              var formatStr = "%s-%s-%s";
              _this5.allNode.riliLb.getComponent(Label).string = js.formatStr(formatStr, year, month + 1, day);
              // 使用新方法将年月日转换为时间戳
              _this5.time = _this5.getTimestamp(year, month, day);
              // 重置dayIndx，因为这是用户自定义选择的日期，不是今天或昨天
              _this5.dayIndx = -1;
              // 更新UI显示
              _this5.allNode.todayDi.getChildByName("light").active = false;
              _this5.allNode.Yesterday_di.getChildByName("light").active = false;
              _this5.updateInfo();
            });
          } else {
            this.UIDatePickerPrefabNew.active = true;
            this.UIDatePickerPrefabNew.getComponent(DatePicker).updateDate();
          }
        };
        return BetStatistcisPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "datePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "Topinfo", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ListLayOut", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnDatePicker", [_dec7], {
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

System.register("chunks:///_virtual/BindPhoneDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKViewBase.ts', './NetConstant.ts', './NGame.ts', './GameDataMgr.ts', './CooldownManager.ts', './HttpPbFunc.ts', './PlatformUtils.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, EditBox, Button, Sprite, StorageKey, UserLoginType, EventName, gloEvent, MKViewBase, CMD_SUCCESS, NGame, gameDataMgr, CooldownManager, HttpPbFunc, PlatformUtils, safetyNum;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
      Button = module.Button;
      Sprite = module.Sprite;
    }, function (module) {
      StorageKey = module.StorageKey;
      UserLoginType = module.UserLoginType;
      EventName = module.EventName;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      CooldownManager = module.CooldownManager;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "d6ef6r33gxPEpyYmw81jNWg", "BindPhoneDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BindPhoneDialog = exports('BindPhoneDialog', (_dec = ccclass('BindPhoneDialog'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(BindPhoneDialog, _MKViewBase);
        function BindPhoneDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = BindPhoneDialog.prototype;
        _proto.start = function start() {
          var _this2 = this;
          this.allNode = this.getAllChildrenMap(this.node);
          // CommonUtils.popUp(this.allNode.Bg)

          this.setBindBtnEnabled(false);
          this.allNode.phoneEditBox.on('text-changed', this.phoneEditBoxFunc, this);
          this.allNode.smsEditBox.on('text-changed', this.CaptchaEditBoxFunc, this);
          this.onClicked(this.allNode.btn_close, function () {
            _this2.close();
          });
          this.onClicked(this.allNode.smsBtn, function () {
            _this2.sendPhoneCode();
          }, false, 2.0);
          this.onClicked(this.allNode.btn_bind, function () {
            _this2.bindPhone();
          });
        };
        _proto.phoneEditBoxFunc = function phoneEditBoxFunc(editBox) {
          var phoneNum = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var Captcha = this.allNode.smsEditBox.getComponent(EditBox).string;
          this.setBindBtnEnabled(phoneNum.length > 0 && Captcha.length > 0);
        };
        _proto.CaptchaEditBoxFunc = function CaptchaEditBoxFunc(editBox) {
          var phoneNum = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var otp = this.allNode.smsEditBox.getComponent(EditBox).string;
          this.setBindBtnEnabled(phoneNum.length > 0 && otp.length > 0);
        };
        _proto.bindPhone = function bindPhone() {
          var _this3 = this;
          var phone = this.allNode.phoneEditBox.getComponent(EditBox).string;
          var otp = this.allNode.smsEditBox.getComponent(EditBox).string;
          if (phone.length == 0 || otp.length == 0) {
            NGame.tips.toast("Please enter your phone number and verification code".i18nStr());
            return;
          }
          HttpPbFunc.pbfixBindPhoneReq(this.node, {
            pbfixPhone: phone,
            pbfixOtp: otp
          }, function (result) {
            if (result.pbfixCode == CMD_SUCCESS) {
              var _gameDataMgr$hallConf;
              // NGame.tips.toast("Phone number bound successfully".i18nStr());
              _this3.close();
              HttpPbFunc.pbfixUserInfoReq(null, true, function (data) {});
              // 绑定成功后，展示奖励弹框
              var rewardNum = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixGiftBindPhone).cToRateNum();
              NGame.dialog.showGetRewardDialog({
                rewardNum: rewardNum
              });

              // 刷新活动数据
              _this3.updateAtyData();
              NGame.storage.set(StorageKey.LOGIN_TYPE, UserLoginType.USER_LOGIN_TYPE_PHONE);
              NGame.storage.set(StorageKey.PHONE_NUMBER, phone);
            } else {
              NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Failed to bind phone number".i18nStr());
            }
          });
        };
        _proto.sendPhoneCode = function sendPhoneCode() {
          var _this4 = this;
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
                _this4.allNode.smsBtn.getComponent(CooldownManager).onOtpBtnClick();
              }
            });
          }
        }

        /** 刷新活动数据 */;
        _proto.updateAtyData = function updateAtyData() {
          // 对三个模块的活动数据进行处理，剔除掉绑定手机的活动
          gameDataMgr.bonusActivityList = gameDataMgr.bonusActivityList.filter(function (item) {
            return item.pbfixActionParams != '10';
          });
          gameDataMgr.promotionActivityList = gameDataMgr.promotionActivityList.filter(function (item) {
            return item.pbfixActionParams != '10';
          });
          gameDataMgr.sidebarActivityList = gameDataMgr.sidebarActivityList.filter(function (item) {
            return item.pbfixActionParams != '10';
          });
          gloEvent.emit(EventName.ON_ACT_LIST_UPDATE);
        };
        _proto.setBindBtnEnabled = function setBindBtnEnabled(enabled) {
          this.allNode.btn_bind.getComponent(Button).interactable = enabled;
          this.allNode.btn_bind.getComponent(Sprite).grayscale = !enabled;
        }

        // closeView() {
        //     GlobalRoot.instance.UiManager.closePopup(GlobalManager.popups.BindPhoneView)
        // }
        ;

        return BindPhoneDialog;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BonusPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './VScrollView.ts', './GameDataMgr.ts', './BannerView.ts', './ActivityJumper.ts', './BaseTabPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, inject, VirtualScrollView, gameDataMgr, BannerView, ActivityJumper, BaseTabPage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      ActivityJumper = module.ActivityJumper;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "57156jA6NxOJaC0KjePsUzX", "BonusPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BonusPage = exports('BonusPage', (_dec = ccclass('BonusPage'), _dec2 = inject("ScrollView", VirtualScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(BonusPage, _BaseTabPage);
        function BonusPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scrollView", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = BonusPage.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.open = function open() {
          var list = gameDataMgr.bonusActivityList;
          this.scrollView.renderItemFn = function (itemNode, index) {
            var act = list[index];
            itemNode.getComponent(BannerView).setData(act);
            // itemNode.child(`img`).loadUrlImg(
            //     {
            //         url: act.imgUrl,
            //         target: this.node
            //     }
            // )
            // // itemNode.child(`img`).loadImg(`home/img/tempP/p${index + 1}`, BundleName.HALL)
            // itemNode.child(`textLeft`).setText(act.title);
            // itemNode.child(`btnDetail`).setText(act.btnName);
            // itemNode.child(`img`).child(`countdown`).active = false;
            // itemNode.getChildByPath('img/turntable_num').active = act.actionType == 2 && act.actionParams == `7` && gameDataMgr.wheelActivityInfo.remainTimes > 0;
          };

          this.scrollView.onItemClickFn = function (itemNode, index) {
            ActivityJumper.open(list[index]);
          };
          this.scrollView.refreshList(list);
        };
        return BonusPage;
      }(BaseTabPage), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CantWithdrawToRecharge.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './PayUtils.ts', './FirstDeposit.ts', './SwitchTabData.ts', './GoogleAnatytics.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, EventName, HomeTabIndex, TabEvent, gloEvent, MKViewBase, NGame, gameDataMgr, UIController, PayUtils, FirstDeposit, SwitchTabData, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a9c6fzF0PdBYZ+EOF+zD6Gc", "CantWithdrawToRecharge", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CantWithdrawToRecharge = exports('CantWithdrawToRecharge', (_dec = ccclass('CantWithdrawToRecharge'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(CantWithdrawToRecharge, _MKViewBase);
        function CantWithdrawToRecharge() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = CantWithdrawToRecharge.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          var _this2 = this;
          GoogleAnalytics.track(GAEvent.DIALOG_NEED_DEPOSIT_TO_WITHDRAWAL);
          this.onClicked(this.allNode.closeBtn, function () {
            GoogleAnalytics.track(GAEvent.DIALOG_NEED_DEPOSIT_TO_WITHDRAWAL_CLICK_CANCEL);
            _this2.closeView();
          });
          this.onClicked(this.allNode.btnRecharge, function () {
            GoogleAnalytics.track(GAEvent.DIALOG_NEED_DEPOSIT_TO_WITHDRAWAL_CLICK_OKAY);
            _this2.closeView();
            if (gameDataMgr.userInfo.pbfixBalance == 0 && !PayUtils.isFirstPayActBuyed) {
              GoogleAnalytics.track(GAEvent.WITHDRAWAL_TO_FIRST_RECHARGE_270);
              NGame.uiManage.open(FirstDeposit);
            } else {
              GoogleAnalytics.track(GAEvent.WITHDRAWAL_TO_NORMAL_RECHARGE);
              gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                event: TabEvent.DEPOSIT_W
              }));
            }
          });
        };
        _proto.closeView = function closeView() {
          this.closeAndDestroy();
        };
        return CantWithdrawToRecharge;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CashPoolDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './Utils.ts', './SwitchTabData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, EventName, RedDotType, HomeTabIndex, TabEvent, inject, gloEvent, MKViewBase, NGame, gameDataMgr, HttpPbFunc, isResponseValid, safetyNum, Utils, SwitchTabData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      EventName = module.EventName;
      RedDotType = module.RedDotType;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "d6923ei9sFIdIMUTfFv5CmH", "CashPoolDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CashPoolDialog = exports('CashPoolDialog', (_dec = ccclass('CashPoolDialog'), _dec2 = inject("content/content_available", Node), _dec3 = inject("content/content_unavailable", Node), _dec4 = inject("content/content_available/comBetValue/value", Node), _dec5 = inject("content/content_available/extractableAmount/amount", Node), _dec6 = inject("content/btnAction", Node), _dec7 = inject("content/btnActionNo", Node), _dec8 = inject("content/btnClose", Node), _dec9 = inject("content/content_available/ruleDesc", Node), _dec10 = inject("content/content_unavailable/RichText", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(CashPoolDialog, _MKViewBase);
        function CashPoolDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "contentAvailable", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "contentUnavailable", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comBetValue", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "extractableAmount", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnAction", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnActionNo", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnClose", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ruleDesc", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ruleDesc2", _descriptor9, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CashPoolDialog.prototype;
        _proto.open = function open() {
          this.onClicked(this.btnClose, this.closeAndDestroy.bind(this));
          this.initUI();
          this.reloadData();
        };
        _proto.initUI = function initUI() {
          var _gameDataMgr$hallConf,
            _this2 = this;
          var cashPoolExtractRate = safetyNum(gameDataMgr == null || (_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixCashPoolExtractRate).cToFeeRateNum() + "%";
          var action = function action() {
            _this2.closeAndDestroy();
          };
          if (gameDataMgr.userInfo.pbfixBalance > 0) {
            this.btnAction.child("Label").setText("Get".i18nStr());
            this.contentAvailable.active = true;
            this.contentUnavailable.active = false;
            this.ruleDesc.setText("cashPoolRules".i18nStr([cashPoolExtractRate]));
            var data = gameDataMgr.cashPoolData;
            if (data) {
              var _data$pbfixCompletedB;
              var extractableAmount = safetyNum(data.pbfixExtractableAmount);
              this.comBetValue.setText(Utils.setCurrency(data == null || (_data$pbfixCompletedB = data.pbfixCompletedBetValue) == null ? void 0 : _data$pbfixCompletedB.cToRateNum()));
              this.extractableAmount.setText(Utils.setCurrency(extractableAmount.cToRateNum()));
              this.btnAction.loadImg("");
              this.btnAction.active = extractableAmount > 0;
              this.btnActionNo.active = extractableAmount <= 0;
              action = function action() {
                if (gameDataMgr.cashPoolData && extractableAmount > 0) {
                  HttpPbFunc.pbfixExtractCashPoolReq(_this2.node, function (data) {
                    if (isResponseValid(data)) {
                      // 提取成功后，隐藏红点
                      gloEvent.emit(EventName.RED_DOT_HIDE, {
                        type: RedDotType.RED_DOT_CASH_POOL_REWARD
                      });
                      _this2.reloadData();
                    }
                  });
                } else {
                  NGame.tips.toast("No redeemable amount_ Go play the game!".i18nStr());
                }
              };
            }
          } else {
            this.btnAction.child("Label").setText("Deposit".i18nStr());
            this.contentUnavailable.active = true;
            this.contentAvailable.active = false;
            this.ruleDesc2.setText("cashPoolRules2".i18nStr([cashPoolExtractRate]));
            action = function action() {
              gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                event: TabEvent.DEPOSIT_DEPOSIT
              }));
              _this2.closeAndDestroy();
            };
          }
          this.onClicked(this.btnAction, action);
        };
        _proto.reloadData = function reloadData() {
          var _this3 = this;
          HttpPbFunc.pbfixCashPoolDataReq(this.node, function (data) {
            if (isResponseValid(data)) {
              _this3.initUI();
            }
          });
        };
        return CashPoolDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contentAvailable", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "contentUnavailable", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "comBetValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "extractableAmount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnAction", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnActionNo", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ruleDesc", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ruleDesc2", [_dec10], {
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

System.register("chunks:///_virtual/CheckinAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './UIHelper.ts', './VScrollView.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts', './WeeklyCardRule.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, color, RedDotType, EventName, inject, UIHelper, UIPath, VirtualScrollView, gloEvent, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, isResponseValid, pbfixPaymentSource, PayUtils, safetyNum, Utils, WeeklyCardRule, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      color = module.color;
    }, function (module) {
      RedDotType = module.RedDotType;
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      WeeklyCardRule = module.WeeklyCardRule;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "34742D6cmZMJoWvWQ6Ph1I8", "CheckinAct", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 每日签到活动
       */
      var CheckinAct = exports('CheckinAct', (_dec = ccclass('CheckinAct'), _dec2 = inject("content/listView", VirtualScrollView), _dec3 = inject("content/buyNowBtn", Node), _dec4 = inject("content/btnGet", Node), _dec5 = inject("content/btnTips", Node), _dec6 = inject("content/highestReward", Node), _dec7 = inject("content/closeBtn", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(CheckinAct, _MKViewBase);
        function CheckinAct() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "listView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buyNowBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnGet", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnTips", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "highestReward", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeBtn", _descriptor6, _assertThisInitialized(_this));
          // allNode: any = null;
          _this.curRewardNum = 0;
          return _this;
        }
        var _proto = CheckinAct.prototype;
        _proto.onLoad = function onLoad() {
          // this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          GoogleAnalytics.track(GAEvent.DIALOG_DAILY_BONUS);
          this.onClicked(this.closeBtn, this.closeView.bind(this));
          this.popUpAndClicked(this.btnTips, this.openRuleView.bind(this));
          this.initUi();
          this.reloadData();
        };
        _proto.initUi = function initUi(isInit) {
          var _this2 = this;
          if (isInit === void 0) {
            isInit = true;
          }
          var checkinActData = gameDataMgr.checkinActData;
          var checkinList = checkinActData.pbfixClaimItems;
          var weeklyCardList = checkinActData.pbfixPurchasedWeeklyCardClaimItems;
          var highestRewardNum = 0;
          weeklyCardList.forEach(function (data) {
            highestRewardNum += safetyNum(data.pbfixConf.pbfixBenefit.pbfixBenefitValue);
          });
          this.highestReward.setText(Utils.setCurrency(Math.ceil(highestRewardNum.cToRateNum())) + "+");

          // 周卡奖励只显示增量数值
          var dayCardRewardList = [];
          var weeklyCardRewardList = [];
          checkinList.forEach(function (checkinData, idx) {
            dayCardRewardList.push(safetyNum(checkinData.pbfixConf.pbfixBenefit.pbfixBenefitValue));
            weeklyCardRewardList.push(safetyNum(weeklyCardList[idx].pbfixConf.pbfixBenefit.pbfixBenefitValue) - safetyNum(checkinData.pbfixConf.pbfixBenefit.pbfixBenefitValue));
          });
          var canGet = false;
          this.btnGet.active = false;
          this.buyNowBtn.active = false;
          var curCheckinIdx = 0;
          var checkShowBtnGet = function checkShowBtnGet(cards) {
            var getCard = cards.find(function (card) {
              return card.pbfixStatus == 1;
            });
            if (getCard) {
              canGet = true;
              _this2.curRewardNum = getCard.pbfixConf.pbfixBenefit.pbfixBenefitValue;
              curCheckinIdx = cards.indexOf(getCard);
            }
            if (!getCard) {
              cards.forEach(function (card, idx) {
                if (card.pbfixStatus == 2) {
                  curCheckinIdx = idx;
                }
              });
            }
          };
          var isBuyWeeklyCard = checkinActData.pbfixIsPurchasedWeeklyCard;

          // 如果已购买周卡，则直接使用周卡数据
          if (isBuyWeeklyCard) {
            checkinList = weeklyCardList;
            checkShowBtnGet(weeklyCardList);
          } else {
            checkShowBtnGet(checkinList);
          }
          if (!isInit) {
            this.buyNowBtn.child("isBuyed").active = isBuyWeeklyCard;
            var buyPrice = safetyNum(checkinActData.pbfixWeeklyCardPrice);
            var oriPrice = safetyNum(gameDataMgr.weeklyCardData.pbfixOriPrice);
            this.buyNowBtn.child("buyPrice").setText(Utils.setCurrency(buyPrice.cToRateNum()));
            this.buyNowBtn.child("oriPrice").setText(Utils.setCurrency(oriPrice.cToRateNum()));
            this.buyNowBtn.child("buyPrice").getComponent(Label).color = color(isBuyWeeklyCard ? "#D1D1D1" : "#FFF000");
            this.buyNowBtn.child("buyPrice").getComponent(Label).outlineColor = color(isBuyWeeklyCard ? "#313131" : "#007761");
            this.buyNowBtn.child("oriPrice").getComponent(Label).color = color(isBuyWeeklyCard ? "#434343" : "#003128");
            if (isBuyWeeklyCard) {
              this.offClicked(this.buyNowBtn);
              UIController.popUp(this.buyNowBtn);
            } else {
              this.popUpAndClicked(this.buyNowBtn, this.buyCard.bind(this, buyPrice));
            }
          }
          if (!isInit) {
            this.btnGet.child("noGet").active = !canGet;
            this.btnGet.child("Label").setText((canGet ? "Get" : "Claimed").i18nStr());
            if (canGet) {
              this.popUpAndClicked(this.btnGet, this.getCheckinRewar.bind(this));
            } else {
              this.offClicked(this.btnGet);
              UIController.popUp(this.btnGet);
            }
          }
          if (canGet) {
            // 将红点加入到gameDataMgr.redDotSet中
            gameDataMgr.redDotSet.add(RedDotType.RED_DOT_DAILY_SIGN);
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: RedDotType.RED_DOT_DAILY_SIGN
            });
          } else {
            gameDataMgr.redDotSet["delete"](RedDotType.RED_DOT_DAILY_SIGN);
            gloEvent.emit(EventName.RED_DOT_HIDE, {
              type: RedDotType.RED_DOT_DAILY_SIGN
            });
          }
          var setCardData = function setCardData(cardItem, status, rewardNum, index) {
            cardItem.child("price").setText(Utils.changeMoneyUnit(rewardNum.cToRateNum(), 1));
            cardItem.child("cuoguo").active = status == 3;
            cardItem.child("wc").active = status == 2;
            var lock = cardItem.child("lock");
            if (lock) {
              lock.active = !isBuyWeeklyCard;
              cardItem.child("xzImg").active = curCheckinIdx == index && isBuyWeeklyCard;
            } else {
              cardItem.child("xzImg").active = curCheckinIdx == index;
            }
          };
          this.listView.renderItemFn = function (item, index) {
            // `renderItemFn: ${index}`.logI(`asfasfasdg341g34`)
            item.child("day").setText(("Day " + (index + 1)).i18nStr());
            setCardData(item.child("dayItem"), checkinList[index].pbfixStatus, dayCardRewardList[index], index);
            setCardData(item.child("weeklyDayItem"), weeklyCardList[index].pbfixStatus, weeklyCardRewardList[index], index);
            if (index == curCheckinIdx) {
              _this2.offClicked(item.child("dayItem"));
              _this2.offClicked(item.child("weeklyDayItem"));
              _this2.onClicked(item.child("dayItem"), function () {
                if (canGet) {
                  _this2.getCheckinRewar();
                }
              });
              _this2.onClicked(item.child("weeklyDayItem"), function () {
                if (isBuyWeeklyCard && canGet) {
                  _this2.getCheckinRewar();
                }
                if (!isBuyWeeklyCard) {
                  _this2.buyCard(safetyNum(checkinActData.pbfixWeeklyCardPrice));
                }
              });
            } else {
              _this2.offClicked(item.child("dayItem"));
              _this2.offClicked(item.child("weeklyDayItem"));
            }
          };
          this.listView.refreshList(weeklyCardList);
          if (curCheckinIdx > 0) {
            this.scheduleOnce(function () {
              // `done`.logI(`asfasfasdg341g34`)
              _this2.listView.scrollToIndex(curCheckinIdx);
            }, 0.1);
          }
        }

        /**领取免费签到奖励 */;
        _proto.getCheckinRewar = function getCheckinRewar() {
          var _this3 = this;
          GoogleAnalytics.track(GAEvent.DIALOG_DAILY_BONUS_CLICK_GET);
          HttpPbFunc.pbfixCheckinClaimReq(this.node, function () {
            NGame.dialog.showGetRewardDialog({
              rewardNum: _this3.curRewardNum.cToRateNum()
            });
            _this3.reloadData();
          });
        };
        _proto.openRewardView = function openRewardView(rewardNum) {
          NGame.dialog.showGetRewardDialog({
            rewardNum: rewardNum.cToRateNum()
          });
        };
        _proto.closeView = function closeView() {
          var _this$initData;
          GoogleAnalytics.track(GAEvent.DIALOG_DAILY_BONUS_CLICK_CLOSE);
          this.closeAndDestroy();
          this.close();
          (_this$initData = this.initData) == null || _this$initData.onActClose == null || _this$initData.onActClose();
          gloEvent.emit(EventName.REMOVE_DIALOG_TOUCH_MASK);
        };
        _proto.openRuleView = function openRuleView() {
          UIHelper.openUI(WeeklyCardRule, UIPath.WeeklyCardRule);
        };
        _proto.buyCard = function buyCard(weeklyCardPrice) {
          var _this4 = this;
          GoogleAnalytics.track(GAEvent.DIALOG_DAILY_BONUS_CLICK_BUY);
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_WEEKLY_CARD, weeklyCardPrice, 0, function () {
            if (_this4.isValid) {
              NGame.dialog.showGetRewardDialog({
                rewardNum: weeklyCardPrice.cToRateNum()
              });
              HttpPbFunc.pbfixWeeklyCardBenefitClaimReq(_this4.node, function () {});
              _this4.reloadData();
            }
          });
        };
        _proto.reloadData = function reloadData() {
          var _this5 = this;
          HttpPbFunc.pbfixCheckinDataReq(this.node, function (result) {
            if (isResponseValid(result)) {
              _this5.initUi(false);
            }
          });
        };
        return CheckinAct;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buyNowBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnGet", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnTips", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "highestReward", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec7], {
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

System.register("chunks:///_virtual/CurrencySwitcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './NativeService.ts', './PlatformUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Color, tween, Vec3, Tween, UIOpacity, EventName, StorageKey, MoneyType, gloEvent, MKStaticViewBase, NGame, gameDataMgr, NativeService, NativeFuncName, PlatformUtils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Color = module.Color;
      tween = module.tween;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      EventName = module.EventName;
      StorageKey = module.StorageKey;
      MoneyType = module.MoneyType;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      NativeService = module.default;
      NativeFuncName = module.NativeFuncName;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "795846b7KRMFo1S5VLH+7n3", "CurrencySwitcher", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 货币切换组件
       */
      var CurrencySwitcher = exports('CurrencySwitcher', (_dec = ccclass('CurrencySwitcher'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(CurrencySwitcher, _MKStaticViewBase);
        function CurrencySwitcher() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "curCurrencyBg", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "switchBtn", _descriptor2, _assertThisInitialized(_this));
          // 切换按钮
          _initializerDefineProperty(_this, "cashTagLabel", _descriptor3, _assertThisInitialized(_this));
          // 货币1符号($ )  
          _initializerDefineProperty(_this, "cashLabel", _descriptor4, _assertThisInitialized(_this));
          // 货币1文本
          _initializerDefineProperty(_this, "freeBonusLabel", _descriptor5, _assertThisInitialized(_this));
          // 货币2 
          _initializerDefineProperty(_this, "diamondIcon", _descriptor6, _assertThisInitialized(_this));
          // 钻石图标
          _initializerDefineProperty(_this, "bubbleIcon", _descriptor7, _assertThisInitialized(_this));
          // 气泡图标
          _this.curSelCurrencyType = 1;
          // 默认选中：freeBonus
          _this.needShowToas = true;
          _this.isPlayingAni = false;
          // 是否正在播放动画，防止重复点击
          _this.bubleAniScheduledCallback = null;
          // 配置参数
          _this.selFreeBonusPosY = -22;
          _this.unselFreeBonusPosY = 22;
          _this.selColor = new Color(255, 255, 255, 255);
          _this.unselColor = new Color(208, 208, 208, 255);
          // #D0D0D0
          _this.selLabelSize = 30;
          _this.unselLabelSize = 22;
          _this.duration = 0.3;
          return _this;
        }
        var _proto = CurrencySwitcher.prototype;
        // 动画时长 
        _proto.open = function open() {
          var _this2 = this;
          // this.onMsg(EventName.ON_GET_USER_INFO, () => {
          //     if (this.isPlayingAni) return;
          //     this.updateState();
          // });

          this.onMsg(EventName.SWITICH_CURRENCY_BY_DIALOG, function () {
            // 同步切换
            if (_this2.isPlayingAni) return;
            _this2.onSwitchCurrencyByDialog();
            _this2.startBubbleAnim();
          });
          this.onMsg(EventName.SHOW_SWITICH_CURRENCY_BUBBLE_ANI, function () {
            _this2.startBubbleAnim();
          });
        }

        // private updateState() {
        //     const temCurState = this.isSelFreeBonus;
        //     const lastSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
        //     if (lastSelType === MoneyType.MONEY_TYPE_FREE_BONUS) {
        //         const bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
        //         const balance = gameDataMgr.userInfo.pbfixBalance || 0
        //         const freeBonus = gameDataMgr.userInfo.pbfixBonus || 0
        //         if (freeBonus < bankruptcyLine && balance > bankruptcyLine) {
        //             this.isSelFreeBonus = false; // 默认选中余额
        //             NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, MoneyType.MONEY_TYPE_BALANCE);

        //             if (temCurState == this.isSelFreeBonus) {
        //                 return;
        //             }
        //             this.needShowToas = true;
        //             this.playSwitchAnimation();
        //         }
        //     }
        // }
        ;

        _proto.onSwitchCurrencyByDialog = function onSwitchCurrencyByDialog() {
          this.needShowToas = false;
          var latestSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          if (this.curSelCurrencyType == latestSelType) {
            return;
          }
          this.curSelCurrencyType = latestSelType;
          this.playSwitchAnimation();
        };
        _proto.initState = function initState() {
          var lastSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          this.needShowToas = false; // 初始化状态不需要显示toast

          // const bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
          var balance = gameDataMgr.userInfo.pbfixBalance || 0;
          // const freeBonus = gameDataMgr.userInfo.pbfixBonus || 0
          if (lastSelType == 0) {
            // 没有选择币种
            if (balance > 0) {
              this.curSelCurrencyType = MoneyType.MONEY_TYPE_BALANCE; // 选中cash
              NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, MoneyType.MONEY_TYPE_BALANCE);
            } else {
              // 没有余额的情况
              NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, MoneyType.MONEY_TYPE_FREE_BONUS);
            }
          } else {
            this.curSelCurrencyType = lastSelType;
          }
          if (this.curSelCurrencyType == MoneyType.MONEY_TYPE_FREE_BONUS) {
            return; // UI默认状态就是赠金类型，无需动画
          }

          this.playSwitchAnimation();
        }

        /**
         * 点击切换按钮触发
         */;
        _proto.onSwitchClick = function onSwitchClick() {
          if (this.isPlayingAni) return;
          this.needShowToas = true;
          this.curSelCurrencyType = this.curSelCurrencyType == MoneyType.MONEY_TYPE_FREE_BONUS ? MoneyType.MONEY_TYPE_BALANCE : MoneyType.MONEY_TYPE_FREE_BONUS;
          NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, this.curSelCurrencyType || 0);
          this.playSwitchAnimation();
          gloEvent.emit(EventName.SWITICH_CURRENCY_BY_SWITCHER, {
            currencyType: this.curSelCurrencyType
          });
        };
        _proto.playSwitchAnimation = function playSwitchAnimation() {
          var _this3 = this;
          this.isPlayingAni = true;
          var targetPosY = this.curSelCurrencyType == MoneyType.MONEY_TYPE_FREE_BONUS ? this.selFreeBonusPosY : this.unselFreeBonusPosY;

          // 2. 边框位移动画 (使用 backOut 增加灵动感)
          tween(this.curCurrencyBg).to(this.duration, {
            position: new Vec3(this.curCurrencyBg.position.x, targetPosY, this.curCurrencyBg.position.z)
          }, {
            easing: 'backOut'
          }).call(function () {
            _this3.isPlayingAni = false;
            if (_this3.needShowToas) {
              var str = _this3.curSelCurrencyType == MoneyType.MONEY_TYPE_FREE_BONUS ? "Switched to Bonus Balance" : "Switched to Cash Balance";
              NGame.tips.toast(str.i18nStr());

              // 给个震动效果
              if (PlatformUtils.isMobileNative()) {
                NativeService.callNativeFunc(NativeFuncName.VIBRATE, {
                  value: "1"
                });
              }
            }
          }).start();

          // 3. 按钮旋转动画 (视觉震撼的小细节：切换时按钮自转)
          tween(this.switchBtn).by(this.duration, {
            angle: -180 * 5
          }, {
            easing: 'quartOut'
          }).start();

          // 4. 处理货币1 (Label)
          var isSelFreeBonus = this.curSelCurrencyType == MoneyType.MONEY_TYPE_FREE_BONUS;
          this.animateLabel(this.cashTagLabel, !isSelFreeBonus);
          this.animateLabel(this.cashLabel, !isSelFreeBonus);

          // 5. 处理货币2 (Label + Icon)
          this.animateLabel(this.freeBonusLabel, isSelFreeBonus);
          this.animateIcon(this.diamondIcon, isSelFreeBonus);
        };
        _proto.animateLabel = function animateLabel(label, isActive) {
          var targetSize = isActive ? this.selLabelSize : this.unselLabelSize;
          var targetColor = isActive ? this.selColor : this.unselColor;

          // Label 的 fontSize 不支持 tween 直接插值，通过自定义对象模拟
          var obj = {
            size: label.fontSize
          };
          tween(obj).to(this.duration, {
            size: targetSize
          }, {
            onUpdate: function onUpdate() {
              label.fontSize = obj.size;
            },
            easing: 'sineOut'
          }).start();

          // 颜色渐变
          label.node.getComponent(Label).color = targetColor;
          // 注意：Cocos 3.x 颜色建议通过渐变或者直接设置，此处简写
        };

        _proto.animateIcon = function animateIcon(icon, isActive) {
          var targetScale = isActive ? 1.0 : 0.7; // 选中1倍，未选中缩小
          tween(icon).to(this.duration, {
            scale: new Vec3(targetScale, targetScale, 1)
          }, {
            easing: 'backOut'
          }).start();
        }

        /**
         * 气泡动效
         * @param node 
         */;
        _proto.startBubbleAnim = function startBubbleAnim() {
          var node = this.bubbleIcon;
          node.active = true;

          // 先停止所有动效
          Tween.stopAllByTarget(node);
          var delayRemove = 10; // 显示多久消失

          // 1.上下浮动
          tween(node).repeatForever(tween().to(0.8, {
            position: new Vec3(224, -62, 0)
          }, {
            easing: "sineOut"
          }).to(0.8, {
            position: new Vec3(224, -52, 0)
          }, {
            easing: "sineIn"
          })).start();

          // 2.缩放呼吸
          tween(node).repeatForever(tween().to(0.8, {
            scale: new Vec3(1.05, 1.05, 1)
          }, {
            easing: "sineOut"
          }).to(0.8, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "sineIn"
          })).start();

          // 3.偶尔弹一下
          tween(node).repeatForever(tween().delay(3).to(0.15, {
            scale: new Vec3(1.15, 1.15, 1)
          }).to(0.15, {
            scale: new Vec3(1, 1, 1)
          })).start();
          this.removeScheduledCallback();
          this.bubleAniScheduledCallback = this.hideBubbleAnim.bind(this);
          this.scheduleOnce(this.bubleAniScheduledCallback, delayRemove);
        };
        _proto.hideBubbleAnim = function hideBubbleAnim() {
          var node = this.bubbleIcon;
          Tween.stopAllByTarget(node);
          tween(node.getComponent(UIOpacity)).to(1, {
            opacity: 0
          }, {
            easing: 'fade'
          }) // 'fade' 或 'quadOut' 效果较好
          .call(function () {
            node.active = false;
            node.getComponent(UIOpacity).opacity = 255;
          }).start();
        };
        _proto.removeScheduledCallback = function removeScheduledCallback() {
          if (this.bubleAniScheduledCallback) {
            this.unschedule(this.bubleAniScheduledCallback);
            this.bubleAniScheduledCallback = null;
          }
        };
        return CurrencySwitcher;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "curCurrencyBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "switchBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cashTagLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cashLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "freeBonusLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "diamondIcon", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bubbleIcon", [_dec8], {
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

System.register("chunks:///_virtual/DailyFirstRechargeDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './GameDataMgr.ts', './Utils.ts', './SwitchTabData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, EventName, HomeTabIndex, TabEvent, inject, gloEvent, MKViewBase, gameDataMgr, safetyNum, SwitchTabData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      safetyNum = module.safetyNum;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "d3d2cdPY79Nd4sbbMlG7yje", "DailyFirstRechargeDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DailyFirstRechargeDialog = exports('DailyFirstRechargeDialog', (_dec = ccclass('DailyFirstRechargeDialog'), _dec2 = inject("content/bg/desc", Node), _dec3 = inject("content/bg/btnRecharge", Node), _dec4 = inject("content/btnClose", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(DailyFirstRechargeDialog, _MKViewBase);
        function DailyFirstRechargeDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "desc", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRecharge", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnClose", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = DailyFirstRechargeDialog.prototype;
        _proto.open = function open() {
          var _safetyNum$cToRateNum,
            _gameDataMgr$hallConf,
            _this2 = this;
          this.desc.setText("Daily first recharge reward desc".i18nStr([(_safetyNum$cToRateNum = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixDailyFirstPayGiftRate).cToRateNum().toString()) != null ? _safetyNum$cToRateNum : ""]));
          this.onClicked(this.btnRecharge, function () {
            _this2.closView();
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_DEPOSIT
            }));
          });
          this.onClicked(this.btnClose, function () {
            var _this2$initData;
            _this2.closView();
            (_this2$initData = _this2.initData) == null || _this2$initData.onActClose == null || _this2$initData.onActClose();
          });
        };
        _proto.closView = function closView() {
          this.close();
          gloEvent.emit(EventName.REMOVE_DIALOG_TOUCH_MASK);
        };
        return DailyFirstRechargeDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "desc", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnRecharge", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec4], {
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

System.register("chunks:///_virtual/DepositInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts', './FirstDeposit.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UIOpacity, instantiate, UITransform, MKStaticViewBase, NGame, gameDataMgr, pbfixPaymentSource, PayUtils, safetyNum, Utils, FirstDeposit, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "84007wnEFxBP4IiJJ9okPCx", "DepositInfo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      /**
       * 常规充值页面
       */
      var DepositInfo = exports('DepositInfo', (_dec = ccclass('DepositInfo'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(DepositInfo, _MKStaticViewBase);
        function DepositInfo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cardListParent", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "actList", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "plyersChoseTip", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shopCardItem", _descriptor5, _assertThisInitialized(_this));
          _this.shopList = null;
          _this.isShowGiveRatio = true;
          _this.curCardIdx = 0;
          _this.cardWidth = 0;
          return _this;
        }
        var _proto = DepositInfo.prototype;
        _proto.onLoad = function onLoad() {
          this.onClicked(this.btnDeposit, this.clickDeposit.bind(this));
          this.cardWidth = (this.cardListParent.contentSize().width - 15) / 2;
        };
        _proto.showView = function showView() {
          var getShopList = function getShopList(shopList) {
            // if (shopList.length <= 10) {
            return shopList;
            // }
            // return shopList.slice(0, 10);
          };

          var commonPayConf = gameDataMgr.payConf.pbfixCommonPayConf;
          var firstPayConf = gameDataMgr.payConf.pbfixFirstPayConf;
          var _ref = PayUtils.isFirstPayActBuyed ? [getShopList(commonPayConf.pbfixShopList), commonPayConf.pbfixDefaultId] : [getShopList(firstPayConf.pbfixShopList), firstPayConf.pbfixDefaultId],
            shopList = _ref[0],
            defaultId = _ref[1];
          this.shopList = shopList;
          this.plyersChoseTip.getComponent(UIOpacity).opacity = 255;
          this.curCardIdx = shopList.findIndex(function (shop) {
            return shop.pbfixId == defaultId;
          });
          this.showDepositInfo(defaultId);
          var firstRechargeAct = this.actList.child("firstRechargeAct");
          firstRechargeAct.active = !PayUtils.isFirstPayActBuyed;
          if (firstRechargeAct.active) {
            var _safetyNum$cToFeeRate;
            firstRechargeAct.child("text").setText("Limit Time First Deposit Bonus! Massive boost for new players".i18nStr(["+" + ((_safetyNum$cToFeeRate = safetyNum(firstPayConf == null ? void 0 : firstPayConf.pbfixMaxGiftRate).cToFeeRateNum()) != null ? _safetyNum$cToFeeRate : 0) + "%"]));
            this.onClicked(firstRechargeAct, function () {
              NGame.uiManage.open(FirstDeposit);
            });
          }
          var dailyFirst = this.actList.child("dailyFirst");
          dailyFirst.active = PayUtils.isDailyFirstPayActVail;
          if (dailyFirst.active) {
            var _gameDataMgr$hallConf;
            dailyFirst.child("text").setText("Daily first deposit increases deposit".i18nStr(["+" + safetyNum(gameDataMgr == null || (_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixDailyFirstPayGiftRate).cToFeeRateNum() + "%"]));
          }
        };
        _proto.showDepositInfo = function showDepositInfo(defaultId) {
          var _this2 = this;
          // const cfg = gameDataMgr.payConf.firstPayConf;
          var depositItemWidth = (this.cardListParent.contentSize().width - 16) / 2;
          this.cardListParent.removeAllChildren();
          var _loop = function _loop(i) {
            var shop = _this2.shopList[i];
            if (shop) {
              var item = instantiate(_this2.shopCardItem);
              item.active = true;
              item.parent = _this2.cardListParent;
              item.getComponent(UITransform).width = depositItemWidth;
              item.child("sel").getComponent(UITransform).width = depositItemWidth + 16;
              item.child("sel").active = shop.pbfixId == defaultId;
              item.child("Label_num").setText(safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum());
              Utils.loadCurrencyIcon(item.child("ic_dollor"));
              var right = item.child("right");
              right.child("heart").active = shop.pbfixId == defaultId;
              var giftRatio = shop.pbfixGiftRatio;
              if (PayUtils.isDailyFirstPayActVail) {
                giftRatio += gameDataMgr.hallConf.pbfixDailyFirstPayGiftRate;
              }
              right.child("Label_add").setText("+" + safetyNum(giftRatio).cToFeeRateNum() + "%");
              _this2.onClicked(item, function () {
                _this2.clickDepositCard(i);
                _this2.plyersChoseTip.getComponent(UIOpacity).opacity = shop.pbfixId == defaultId ? 255 : 0;
              });
            }
          };
          for (var i = 0; i < this.shopList.length; i++) {
            _loop(i);
          }
        };
        _proto.clickDepositCard = function clickDepositCard(index) {
          var _this3 = this;
          // let cardData = this.showDepositCards[index];
          this.curCardIdx = index;
          this.cardListParent.children.forEach(function (cardNode, idx) {
            cardNode.child("sel").active = _this3.curCardIdx === idx;
          });
        };
        _proto.clickDeposit = function clickDeposit() {
          var _this4 = this;
          var shop = this.shopList[this.curCardIdx];
          var isFirstPayActBuyed = PayUtils.isFirstPayActBuyed;
          if (isFirstPayActBuyed) {
            GoogleAnalytics.track(GAEvent.NORMAL_PURCHASE);
          } else {
            GoogleAnalytics.track(GAEvent.FIRST_RECHARGE_270_DEPOSIT);
          }
          PayUtils.goPay(isFirstPayActBuyed ? pbfixPaymentSource.pbfixPAYMENT_SOURCE_RECHARGE : pbfixPaymentSource.pbfixPAYMENT_SOURCE_FIRST_PAY, shop.pbfixPrice, shop.pbfixId, function () {
            if (_this4.isValid) {
              NGame.dialog.showGetRewardDialog({
                rewardNum: safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum()
              });
            }
          });
        };
        return DepositInfo;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cardListParent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "actList", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "plyersChoseTip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "shopCardItem", [_dec6], {
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

System.register("chunks:///_virtual/DepositPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTabBtn.ts', './Constant.ts', './Decorators.ts', './NGame.ts', './GameDataMgr.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './PayUtils.ts', './DepositInfo.ts', './FirstDepositLittle.ts', './WidFirst.ts', './WidInfo.ts', './BaseTabPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, GloTabBtn, TabEvent, EventName, inject, NGame, gameDataMgr, pbfixActivityJoinStatus, GoogleAnalytics, GAEvent, PayUtils, DepositInfo, FirstDepositLittle, WidFirst, WidInfo, BaseTabPage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      GloTabBtn = module.GloTabBtn;
    }, function (module) {
      TabEvent = module.TabEvent;
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      pbfixActivityJoinStatus = module.pbfixActivityJoinStatus;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      DepositInfo = module.DepositInfo;
    }, function (module) {
      FirstDepositLittle = module.FirstDepositLittle;
    }, function (module) {
      WidFirst = module.WidFirst;
    }, function (module) {
      WidInfo = module.WidInfo;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
      cclegacy._RF.push({}, "b30142MpD9L34TF06TLlcRm", "DepositPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DepositPage = exports('DepositPage', (_dec = ccclass('DepositPage'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        tooltip: '',
        type: Node
      }), _dec10 = property({
        tooltip: '',
        type: Node
      }), _dec11 = property({
        type: Node
      }), _dec12 = inject("content/btns", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(DepositPage, _BaseTabPage);
        function DepositPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "depositInfoScrollView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widInfoFirstScrollView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widInfoScrollView", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "depositInfo", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widInfoFirst", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widInfo", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "historyInfo", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDepositInfo", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnWidInfo", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnHistory", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btns", _descriptor11, _assertThisInitialized(_this));
          _this.viewState = 0;
          _this.isOnLoad = false;
          return _this;
        }
        var _proto = DepositPage.prototype;
        _proto.onAction = function onAction(acton) {
          if (acton) {
            switch (acton.event) {
              case TabEvent.DEPOSIT_DEPOSIT:
                this.showDepositInfo();
                break;
              case TabEvent.DEPOSIT_W:
                this.showWidInfo();
                break;
            }
          }
        };
        _proto.open = function open() {
          var _this2 = this;
          this.onClicked(this.btnDepositInfo, this.clickDepositInfo.bind(this));
          this.onClicked(this.btnWidInfo, this.clickWidInfo.bind(this));
          this.onClicked(this.btnHistory, this.clickTransactionHistory.bind(this));
          this.onMsg(EventName.ON_GET_USER_INFO, function () {
            if (_this2.node.active && _this2.viewState == 1) {
              _this2.showWidInfo();
            }
          });
          this.onMsg(EventName.ON_GET_PAY_CONFIG, function () {
            if (_this2.viewState == 0) {
              _this2.scheduleOnce(function () {
                _this2.showDepositInfo();
              }, 1);
            }
          });
          this.isOnLoad = true;
          this.showDepositInfo();
        };
        _proto.updateWidInfo = function updateWidInfo() {
          if (this.viewState == 1) {
            this.showWidInfo();
          }
        };
        _proto.onEnable = function onEnable() {
          this.showFirstDepositLittle();
          if (this.viewState == 1) {
            this.showWidInfo();
          }
        }

        /**首充小弹窗 */;
        _proto.showFirstDepositLittle = function showFirstDepositLittle() {
          var _gameDataMgr$userInfo;
          if (gameDataMgr.gameBaseData.isFirstDepositLittleShowed) {
            gameDataMgr.gameBaseData.isFirstDepositLittleShowed = false;
            return;
          }
          if (((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixFirstPayActivityStatus) === pbfixActivityJoinStatus.pbfixACTIVITY_JOIN_STATUS_NOT_PARTICIPATED) {
            NGame.uiManage.open(FirstDepositLittle);
          }
        };
        _proto.showView = function showView(idx) {
          if (idx === void 0) {
            idx = 0;
          }
          if (idx == 0) {
            this.showDepositInfo();
          } else {
            this.showWidInfo();
          }
        };
        _proto.showDepositInfo = function showDepositInfo() {
          this.setTopBtnState(0);
          this.widInfoScrollView.active = false;
          this.widInfoFirstScrollView.active = false;
          this.historyInfo.active = false;
          this.depositInfoScrollView.active = true;
          this.depositInfo.getComponent(DepositInfo).showView();
        };
        _proto.showWidInfo = function showWidInfo() {
          var _this3 = this;
          this.setTopBtnState(1);
          this.depositInfoScrollView.active = false;
          this.historyInfo.active = false;

          //是否充值过
          if (PayUtils.hasRecharge) {
            this.widInfoFirstScrollView.active = false;
            this.widInfoScrollView.active = true;
            this.widInfo.getComponent(WidInfo).showView(function () {
              _this3.showDepositInfo();
            });
          } else {
            this.widInfoFirstScrollView.active = true;
            this.widInfoScrollView.active = false;
            this.widInfoFirst.getComponent(WidFirst).showView();
          }
        };
        _proto.showHistory = function showHistory() {
          this.setTopBtnState(2);
          this.widInfoScrollView.active = false;
          this.widInfoFirstScrollView.active = false;
          this.depositInfoScrollView.active = false;
          this.historyInfo.active = true;
          // this.historyInfo.getComponent(DepositTransaction).showView();
        };

        _proto.setTopBtnState = function setTopBtnState(state) {
          this.viewState = state;
          this.btns.children.forEach(function (btn, index) {
            btn.getComponent(GloTabBtn).setSelect(index == state);
          });
        };
        _proto.clickDepositInfo = function clickDepositInfo() {
          this.showDepositInfo();
          // ServerManager.getInstance().getUserInfo();
        };

        _proto.clickWidInfo = function clickWidInfo() {
          GoogleAnalytics.track(GAEvent.CASH_WITHDRAW);
          this.showWidInfo();
        };
        _proto.clickTransactionHistory = function clickTransactionHistory() {
          this.showHistory();
        };
        return DepositPage;
      }(BaseTabPage), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "depositInfoScrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "widInfoFirstScrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "widInfoScrollView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "depositInfo", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "widInfoFirst", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "widInfo", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "historyInfo", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "btnDepositInfo", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btnWidInfo", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btnHistory", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "btns", [_dec12], {
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

System.register("chunks:///_virtual/DepositTransaction.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DatePicker2.ts', './Decorators.ts', './VScrollView.ts', './MKStaticViewBase.ts', './NGame.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, UIOpacity, Button, instantiate, DatePicker2, inject, VirtualScrollView, MKStaticViewBase, NGame, HttpPbFunc, isResponseValid, pbfixPayOrderStatus, pbfixWithdrawOrderStatus, Utils, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
      instantiate = module.instantiate;
    }, function (module) {
      DatePicker2 = module.DatePicker2;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixPayOrderStatus = module.pbfixPayOrderStatus;
      pbfixWithdrawOrderStatus = module.pbfixWithdrawOrderStatus;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;
      cclegacy._RF.push({}, "a66a4SqbdpKy6Lk1EywspjP", "DepositTransaction", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DepositTransaction = exports('DepositTransaction', (_dec = ccclass('DepositTransaction'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: Node
      }), _dec11 = inject("info_layout/list_node/listView", VirtualScrollView), _dec12 = inject("info_layout/list_node/page_info", Node), _dec13 = inject("info_layout/titles1", Node), _dec14 = inject("info_layout/titles2", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(DepositTransaction, _MKStaticViewBase);
        function DepositTransaction() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "btnCalendar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labDate", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "calendarPre", _descriptor3, _assertThisInitialized(_this));
          _this.calendarNode = null;
          _initializerDefineProperty(_this, "toggleGoup", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnArr", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnLeft", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRight", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labPage", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "noData", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "listView", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomPageNode", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titles1", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titles2", _descriptor13, _assertThisInitialized(_this));
          _this.listType = 0;
          /**当前页数 从1开始 */
          _this.curPage = 1;
          _this.startDate = "";
          _this.endDate = "";
          _this.selectedStartDate = null;
          _this.selectedEndDate = null;
          _this.closeCall = null;
          _this.rechargeRecordData = void 0;
          _this.withdrawRecordData = void 0;
          return _this;
        }
        var _proto = DepositTransaction.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          this.btnArr.forEach(function (item, index) {
            _this2.onClicked(item, function () {
              _this2.clickDepositWid(index);
            });
          });
          this.onClicked(this.btnCalendar, this.clickCalendar.bind(this));
          // this.onClicked(this.btnBack, this.closeView.bind(this));
          this.onClicked(this.btnLeft, this.clickLeft.bind(this));
          this.onClicked(this.btnRight, this.clickRight.bind(this));
          this.selectedStartDate = new Date();
          this.selectedEndDate = new Date();
          this.startDate = Utils.formatTime(this.selectedStartDate.getTime(), 'YYYY-MM-DD');
          this.endDate = Utils.formatTime(this.selectedEndDate.getTime(), 'YYYY-MM-DD');
          this.listView.getItemTypeIndexFn = function (index) {
            return _this2.listType;
          };
          this.listView.renderItemFn = function (item, index) {
            var createTime = 0;
            var orderId = "";
            var amount = 0;
            var statusStr = "";
            if (_this2.listType == 0 && _this2.rechargeRecordData && _this2.rechargeRecordData.pbfixRechargeRecordList.length > 0) {
              // 查询充值记录
              var data = _this2.rechargeRecordData.pbfixRechargeRecordList[index];
              createTime = data.pbfixCreateTime;
              orderId = data.pbfixOrderId;
              amount = data.pbfixAmount;
              statusStr = "PayOrderStatus_UNKNOWN".i18nStr();
              if (data.pbfixStatus == pbfixPayOrderStatus.pbfixPAY_STATUS_WAITING) {
                statusStr = "PayOrderStatus_WAITING".i18nStr();
              } else if (data.pbfixStatus == pbfixPayOrderStatus.pbfixPAY_STATUS_SUCCESS) {
                statusStr = "PayOrderStatus_SUCCESS".i18nStr();
              } else if (data.pbfixStatus == pbfixPayOrderStatus.pbfixPAY_STATUS_FAILED) {
                statusStr = "PayOrderStatus_FAILED".i18nStr();
              } else if (data.pbfixStatus == pbfixPayOrderStatus.pbfixPAY_STATUS_PAY_FAILED) {
                statusStr = "PayOrderStatus_PAY_FAILED".i18nStr();
              }
            } else if (_this2.withdrawRecordData && _this2.withdrawRecordData.pbfixWithdrawRecordList.length > 0) {
              // 查询提现记录
              var _data = _this2.withdrawRecordData.pbfixWithdrawRecordList[index];
              createTime = safetyNum(_data.pbfixCreateTime);
              orderId = _data.pbfixOrderId;
              amount = safetyNum(_data.pbfixAmount);
              statusStr = "WithdrawOrderStatus_UNKNOWN".i18nStr();
              if (_data.pbfixStatus == pbfixWithdrawOrderStatus.pbfixWITHDRAW_STATUS_WAITING) {
                statusStr = "WithdrawOrderStatus_WAITING".i18nStr();
              } else if (_data.pbfixStatus == pbfixWithdrawOrderStatus.pbfixWITHDRAW_STATUS_SUCCESS) {
                statusStr = "WithdrawOrderStatus_SUCCESS".i18nStr();
              } else if (_data.pbfixStatus == pbfixWithdrawOrderStatus.pbfixWITHDRAW_STATUS_FAILED) {
                statusStr = "WithdrawOrderStatus_FAILED".i18nStr();
              }
              item.child("fee").setText(safetyNum(_data == null ? void 0 : _data.pbfixFee).cToRateNum());
            }
            item.child("time").setText(Utils.formatTime(createTime, "YYYY-MM-DD HH:mm:ss"));
            item.child("orderId").setText(orderId);
            item.child("amount").setText(amount.cToRateNum());
            item.child("status").setText(statusStr);
          };
          this.updateLabDate();
          this.listType = 0;
          this.setBtnState(0);
          this.qryDataList(0, 1);
        };
        _proto.showView = function showView() {
          // this.scheduleOnce(() => {

          // }, 1)
        };
        _proto.updateLabDate = function updateLabDate() {
          this.labDate.setText(Utils.formatTime(this.selectedStartDate.getTime(), 'YYYY/MM/DD') + " - " + Utils.formatTime(this.selectedEndDate.getTime(), 'YYYY/MM/DD'));
        }

        // showView() {
        //     this.listType = 0;
        //     this.setBtnState(0);
        //     this.qryDataList(0, 1);

        // this.closeCall = closeCall;
        // }

        /**查询列表 */;
        _proto.qryDataList = function qryDataList(listType, page) {
          var _this3 = this;
          this.noData.active = false;
          var onQryDataError = function onQryDataError() {
            _this3.noData.active = true;
            _this3.updateButtomBtnsState(0);
            _this3.listView.refreshList([]);
          };
          var onQryDataEnd = function onQryDataEnd(dataList) {
            if (dataList.length > 0) {
              _this3.updateButtomBtnsState(_this3.rechargeRecordData.pbfixTotalSize);
              _this3.noData.active = dataList.length == 0;
              _this3.listView.refreshList(dataList);
            } else {
              onQryDataError();
            }
          };
          NGame.loading.show(null, null, false);
          if (listType == 0) {
            // 查询充值记录
            HttpPbFunc.pbfixRechargeRecordReq(this.node, this.startDate, this.endDate, page, 20, function (result) {
              NGame.loading.hide();
              if (isResponseValid(result)) {
                _this3.rechargeRecordData = result;
                onQryDataEnd(_this3.rechargeRecordData.pbfixRechargeRecordList);
              } else {
                onQryDataError();
              }
            });
          } else {
            // 查询提现记录
            HttpPbFunc.pbfixWithdrawRecordReq(this.node, this.startDate, this.endDate, page, 20, function (result) {
              NGame.loading.hide();
              if (isResponseValid(result)) {
                _this3.withdrawRecordData = result;
                onQryDataEnd(_this3.withdrawRecordData.pbfixWithdrawRecordList);
              } else {
                onQryDataError();
              }
            });
          }
        }

        /**刷新页面 */
        // updateView(curListType, list: any[], page: number) {
        //     this.dataList = list;

        //     //类目名
        //     // if (curListType == 0) {
        //     // this.labTitle4.setText("Bonus".i18nStr());
        //     // this.labTitle5.setText("Total Money".i18nStr());
        //     // }
        //     // else {
        //     // this.labTitle4.setText("Fee".i18nStr());
        //     // this.labTitle5.setText("Status".i18nStr());
        //     // }

        //     if (list.length == 0 && page == 1) {//无数据
        //         this.noData.active = true;
        //         this.listNode.active = false;
        //         return;
        //     }
        //     else {
        //         this.noData.active = false;
        //         this.listNode.active = true;
        //     }

        //     //列表
        //     let len = Math.max(list.length, this.itemParent.children.length);
        //     for (let i = 0; i < len; i++) {
        //         let item = this.itemParent.children[i];
        //         let data = list[i];
        //         if (!data) {
        //             item.active = false;
        //             continue;
        //         }
        //         if (!item) {
        //             item = instantiate(this.item);
        //             this.itemParent.addChild(item);
        //         }
        //         item.active = true;
        //         item.getChildByName("Label_time").setText(data.add_time);
        //         item.getChildByName("Label_order_no").setText(data.order_number);
        //         item.getChildByName("Label_amount").setText(data.money + "");
        //         if (curListType == 0) {
        //             item.getChildByName("Label_4").setText(data.bonus + "");
        //             item.getChildByName("Label_5").setText(data.total_money + "");
        //         }
        //         else {
        //             item.getChildByName("Label_4").setText(data.pay_fee + "");
        //             item.getChildByName("Label_5").setText(data.status + "");
        //         }
        //     }

        //     //分页
        //     this.labPage.setText(this.curPage);
        // }
        ;

        _proto.clickDepositWid = function clickDepositWid(index) {
          if (this.listType == index) return;
          this.listType = index;
          this.setBtnState(index);
          this.qryDataList(this.listType, 1);
        };
        _proto.setBtnState = function setBtnState(idx) {
          this.btnArr.forEach(function (item, index) {
            item.getChildByName("sel").active = index == idx;
          });
          this.titles1.active = idx == 0;
          this.titles2.active = idx == 1;
        };
        _proto.updateButtomBtnsState = function updateButtomBtnsState(totalSize) {
          if (totalSize == 0) {
            this.bottomPageNode.active = false;
            return;
          }
          this.bottomPageNode.active = true;
          this.labPage.setText(this.curPage);
          var leftBtnCanClick = this.curPage > 1;
          this.btnLeft.getComponent(UIOpacity).opacity = leftBtnCanClick ? 255 : 50;
          this.btnLeft.getComponent(Button).interactable = leftBtnCanClick;
          var rightBtnCanClick = this.curPage < totalSize / 20;
          this.btnRight.getComponent(UIOpacity).opacity = rightBtnCanClick ? 255 : 50;
          this.btnRight.getComponent(Button).interactable = rightBtnCanClick;
        }

        /**点击日历 */;
        _proto.clickCalendar = function clickCalendar() {
          var _this4 = this;
          if (!this.calendarNode) {
            this.calendarNode = instantiate(this.calendarPre);
            this.calendarNode.parent = this.node;
            this.calendarNode.getComponent(DatePicker2).setSelectCall(function (startDate, endDate) {
              _this4.onSelectDate(startDate, endDate);
            });
          }
          this.calendarNode.active = true;
          this.calendarNode.getComponent(DatePicker2).initCalendar(this.selectedStartDate, this.selectedEndDate);
        };
        _proto.onSelectDate = function onSelectDate(startDate, endDate) {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.startDate = Utils.formatTime(startDate.getTime(), 'YYYY-MM-DD');
          this.endDate = Utils.formatTime(endDate.getTime(), 'YYYY-MM-DD');
          this.qryDataList(this.listType, 1);
          this.updateLabDate();
        }

        // closeView() {
        //     this.closeCall && this.closeCall();
        // }
        ;

        _proto.clickLeft = function clickLeft() {
          if (this.curPage <= 1) return;
          this.curPage--;
          this.qryDataList(this.listType, this.curPage);
        };
        _proto.clickRight = function clickRight() {
          // if (this.dataList.length < this.limit) return;
          this.curPage++;
          this.qryDataList(this.listType, this.curPage);
        };
        return DepositTransaction;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCalendar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labDate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "calendarPre", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toggleGoup", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnArr", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnLeft", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnRight", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "labPage", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "noData", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "bottomPageNode", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "titles1", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "titles2", [_dec14], {
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

System.register("chunks:///_virtual/EmailPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './VScrollView.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Node, Sprite, EventName, RedDotType, inject, VirtualScrollView, gloEvent, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, isResponseValid, pbfixMailContentType, pbfixMailGiftClaimedStatus, Utils, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      Sprite = module.Sprite;
    }, function (module) {
      EventName = module.EventName;
      RedDotType = module.RedDotType;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixMailContentType = module.pbfixMailContentType;
      pbfixMailGiftClaimedStatus = module.pbfixMailGiftClaimedStatus;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "e1d50GzVQpITZPYnDC6JjYH", "EmailPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 邮件
      var EmailPage = exports('EmailPage', (_dec = ccclass('EmailPage'), _dec2 = inject("content/content/listView", VirtualScrollView), _dec3 = inject("content/btn_close/", Node), _dec4 = inject("content/content/node_info/bg_gift/", Node), _dec5 = inject("content/content/node_info/btn_collect/", Node), _dec6 = property({
        type: SpriteFrame
      }), _dec7 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(EmailPage, _MKViewBase);
        function EmailPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "listView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "giftBgNode", _descriptor3, _assertThisInitialized(_this));
          // 附件node
          _initializerDefineProperty(_this, "collectBtn", _descriptor4, _assertThisInitialized(_this));
          // 附件领取按钮
          _initializerDefineProperty(_this, "itemBgSpriteFrames", _descriptor5, _assertThisInitialized(_this));
          // item底图（已读/未读）
          _initializerDefineProperty(_this, "readIconSpriteFrames", _descriptor6, _assertThisInitialized(_this));
          // 邮件已读状态图标（已读/未读）
          _this.allNode = null;
          _this.curPage = 1;
          _this.maxPage = 0;
          _this.curDataList = [];
          return _this;
        }
        var _proto = EmailPage.prototype;
        _proto.create = function create() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.onLoad = function onLoad() {}

        // 获取item icon纹理，优先判断附件是否已领取，再判断是否已读
        ;

        _proto.getIconSpriteFrame = function getIconSpriteFrame(mailData) {
          if (mailData.pbfixContentType == pbfixMailContentType.pbfixMAIL_CONTENT_TYPE_GIFT) {
            return mailData.pbfixIsRead ? this.readIconSpriteFrames[3] : this.readIconSpriteFrames[2];
          }
          return mailData.pbfixIsRead ? this.readIconSpriteFrames[1] : this.readIconSpriteFrames[0];
        };
        _proto.open = function open() {
          var _this2 = this;
          this.listView.renderItemFn = function (item, index) {
            var mailData = _this2.curDataList[index];
            item.child("bg").getComponent(Sprite).spriteFrame = _this2.itemBgSpriteFrames[mailData.pbfixIsRead ? 1 : 0];
            item.child("icon_read").getComponent(Sprite).spriteFrame = _this2.getIconSpriteFrame(mailData);
            item.child("label_title").setText(mailData.pbfixTitle.ellipsis(30));
            item.child("label_time").setText(Utils.formatTime(mailData.pbfixSendTime, 'YYYY-MM-DD HH:mm:ss'));
            item.child("icon_reddot").active = _this2.checkItemNeedShowRedDot(mailData);
          };
          this.listView.onItemClickFn = function (item, index) {
            var mailData = _this2.curDataList[index];
            if (!mailData.pbfixIsRead) {
              item.child("bg").getComponent(Sprite).spriteFrame = _this2.itemBgSpriteFrames[1];
              if (mailData.pbfixContentType == pbfixMailContentType.pbfixMAIL_CONTENT_TYPE_GIFT) {
                item.child("icon_read").getComponent(Sprite).spriteFrame = _this2.readIconSpriteFrames[3];
                if (mailData.pbfixGiftClaimStatus == pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED) {
                  item.child("icon_reddot").active = false;
                }
              } else {
                item.child("icon_read").getComponent(Sprite).spriteFrame = _this2.readIconSpriteFrames[1];
                item.child("icon_reddot").active = false;
              }
            }
            _this2.listView.node.active = false;
            _this2.OpenInfoView(mailData, item);
          };
          this.onClicked(this.closeBtn, function () {
            if (_this2.allNode.node_info.active == true) {
              _this2.allNode.node_info.active = false;
              _this2.listView.node.active = true;
            } else {
              _this2.closeAndDestroy();
            }
          }, false, 0.1);
          this.updateInfo();
        };
        _proto.updateInfo = function updateInfo() {
          var _this3 = this;
          this.allNode.icon_nodata.active = false;
          HttpPbFunc.pbfixMailListReq(this.node, function (mailList) {
            if (mailList.length > 0) {
              _this3.curDataList = mailList;
              _this3.listView.refreshList(mailList);
            } else {
              _this3.allNode.icon_nodata.active = true;
            }

            // this.allNode.loadingAni.active = false
          });
        }

        /**
         * 打开邮件详情
         */;
        _proto.OpenInfoView = function OpenInfoView(data, item) {
          var _this4 = this;
          this.allNode.node_info.active = true; // 邮件内容节点
          this.allNode.node_info.child("label_title").setText(data.pbfixTitle);
          this.allNode.node_info.child("label_content").setText(data.pbfixContent);
          this.allNode.node_info.child("label_time").setText(Utils.formatTime(data.pbfixSendTime, 'YYYY-MM-DD HH:mm:ss'));
          // UIController.popUp(this.allNode.node_info);

          this.allNode.btn_del.active = true;
          if (data.pbfixIsRead) ;else {
            HttpPbFunc.pbfixMailReadReq(this.node, data.pbfixId, function () {
              gameDataMgr.systemMsgList.find(function (msg) {
                return msg.pbfixId == data.pbfixId;
              }).pbfixIsRead = true;
              data.pbfixIsRead = true;
              _this4.checkEmailRedDot();
            });
          }
          this.onClicked(this.allNode.btn_del, function () {
            // 判断是否有附件未领取
            if (data.pbfixContentType == pbfixMailContentType.pbfixMAIL_CONTENT_TYPE_GIFT) {
              if (data.pbfixGiftClaimStatus == pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE) {
                NGame.tips.toast("Please claim your reward first".i18nStr());
                return;
              }
            }
            _this4.allNode.node_info.active = false;
            _this4.listView.node.active = true;
            HttpPbFunc.pbfixMailDelReq(_this4.node, [data.pbfixId], function () {
              var delIdx = -1;
              for (var index = 0; index < _this4.curDataList.length; index++) {
                if (_this4.curDataList[index].pbfixId == data.pbfixId) {
                  delIdx = index;
                  break;
                }
              }
              if (delIdx != -1) {
                _this4.curDataList.splice(delIdx, 1);
                _this4.listView.refreshList(_this4.curDataList);
                if (_this4.curDataList.length == 0) {
                  _this4.allNode.icon_nodata.active = true;
                }
              }
            });
          });
          this.showGiftUI(data);
        }

        // 处理大厅邮件按钮红点
        ;

        _proto.checkEmailRedDot = function checkEmailRedDot() {
          var hasUnread = gameDataMgr.systemMsgList.filter(function (m) {
            return m.pbfixIsRead === false;
          }).length > 0;
          if (hasUnread) {
            // 有未读的邮件
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: RedDotType.RED_DOT_MAIL
            });
          } else {
            // 全部已读
            // 判断是否有未领取的附件
            var hasUnclaimed = gameDataMgr.systemMsgList.filter(function (m) {
              return m.pbfixGiftClaimStatus == pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
            }).length > 0;
            if (hasUnclaimed) {
              gloEvent.emit(EventName.RED_DOT_SHOW, {
                type: RedDotType.RED_DOT_MAIL
              });
              return;
            }

            // 删除gameDataMgr.redDotList中的Red_DOT_MAIL
            gameDataMgr.removeRedDot(RedDotType.RED_DOT_MAIL);
            gloEvent.emit(EventName.RED_DOT_HIDE, {
              type: RedDotType.RED_DOT_MAIL
            });
          }
        };
        _proto.checkItemNeedShowRedDot = function checkItemNeedShowRedDot(mailData) {
          if (!mailData.pbfixIsRead) {
            return true;
          }

          // 未领取的附件
          if (mailData.pbfixGiftClaimStatus == pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE) {
            return true;
          }
          return false;
        }

        /**
         * 显示附件UI
         */;
        _proto.showGiftUI = function showGiftUI(data) {
          var _this5 = this;
          if (data.pbfixContentType != pbfixMailContentType.pbfixMAIL_CONTENT_TYPE_GIFT) {
            return;
          }
          var giftList = data.pbfixAttachments || []; // 附件列表
          if (giftList.length == 0) {
            return;
          }
          this.giftBgNode.active = true;

          // 是否可领取附件
          var canCollect = data.pbfixGiftClaimStatus == pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
          var giftData = giftList[0]; // 目前只显示第一个附件，以后需要显示多个附件的时候需要做迭代
          // 可以领取附件的时候不显示删除按钮
          if (canCollect) {
            this.collectBtn.active = true;
            this.allNode.btn_del.active = false;
            this.onClicked(this.collectBtn, function () {
              HttpPbFunc.pbfixMailGiftClaimReq(_this5.node, {
                pbfixId: data.pbfixId
              }, function (result) {
                if (isResponseValid(result)) {
                  data.pbfixGiftClaimStatus = pbfixMailGiftClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;

                  // 显示奖励领取弹框
                  NGame.dialog.showGetRewardDialog({
                    rewardNum: safetyNum(giftData.pbfixValue || 0).cToRateNum()
                  });
                  // 领取成功后，需要更新本地数据，刷新UI
                  _this5.checkEmailRedDot();
                  _this5.listView.refreshList(_this5.curDataList);
                  _this5.showGiftUI(data); // 更新UI
                  // 刷新玩家信息
                  gloEvent.emit(EventName.REQUEST_TO_REQ_USER_INFO);
                } else {
                  NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Collect failed".i18nStr());
                }
              });
            }, false, 1.5, true);
          } else {
            this.allNode.btn_del.active = true;
            this.collectBtn.active = false;
          }

          // 显示附件内容
          if (giftData) {
            this.giftBgNode.child('label_gold').setText(safetyNum(giftData.pbfixValue || 0).cToRateNum());
            this.giftBgNode.child('tag_collected').active = !canCollect;
          }
        };
        return EmailPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "giftBgNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "collectBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itemBgSpriteFrames", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "readIconSpriteFrames", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstDeposit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './Constant.ts', './MKViewBase.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './PayUtils.ts', './Utils.ts', './FirstDepositInfoHad.ts', './FirstDepositInfoNot.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Layout, Widget, UITransform, GloTitleBar, EventName, RATE_FEE, MKViewBase, gameDataMgr, HttpPbFunc, isResponseValid, PayUtils, safetyNum, Utils, FirstDepositInfoHad, FirstDepositInfoNot;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Layout = module.Layout;
      Widget = module.Widget;
      UITransform = module.UITransform;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
      RATE_FEE = module.RATE_FEE;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      FirstDepositInfoHad = module.FirstDepositInfoHad;
    }, function (module) {
      FirstDepositInfoNot = module.FirstDepositInfoNot;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;
      cclegacy._RF.push({}, "2ccfeWiLxdHMblPh0b5O/op", "FirstDeposit", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 首充270
       */
      var FirstDeposit = exports('default', (_dec = ccclass('FirstDeposit'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: GloTitleBar
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: Node
      }), _dec11 = property({
        type: Node
      }), _dec12 = property({
        type: Node
      }), _dec13 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(FirstDeposit, _MKViewBase);
        function FirstDeposit() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "topLayout", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scrollView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalRatio", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labTimeParent", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "timeLabs", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "infoNot", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "infoFirst", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_15", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_17", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_19", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_21", _descriptor12, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = FirstDeposit.prototype;
        _proto.open = function open() {
          // this.scheduleOnce(() => {
          this.gloTitleBar.initBar("First Deposit".i18nStr(), this.close);
          this.showView();
          this.reloadData();
          // }, 0.5)

          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        };
        _proto.onEdgeSwipeBack = function onEdgeSwipeBack(targetNode) {
          if (this.ignoreEdgeSwipeBack(targetNode)) {
            return;
          }
          this.close();
        };
        _proto.onGetFirstRechargeInfo = function onGetFirstRechargeInfo() {
          if (this.node.active) {
            this.showView();
          }
        };
        _proto.showView = function showView() {
          var _this2 = this;
          var cfg = gameDataMgr.payConf.pbfixFirstPayConf;
          var firstDepositUserInfo = gameDataMgr.payConf.pbfixFirstPayRewardData;

          //buy_status :0未参与 1已参与首充270 2已购买一次性首充 (购买了首充buy_status不会等于2)
          var isNotBuy = !PayUtils.isFirstPayActBuyed;

          // order_type: 订单类型 当buy_status为1时有效：0首充 1一级复充 2二级复充 3三级复充
          // let isFirstBuy = !isNotBuy && firstDepositUserInfo.order_type == 0;
          // let isOneBuy = !isNotBuy && firstDepositUserInfo.order_type == 1;
          // let isTwoBuy = !isNotBuy && firstDepositUserInfo.order_type == 2;
          // let isThreeBuy = !isNotBuy && firstDepositUserInfo.order_type == 3;

          //是否过期( day_num: 购买天数下标 0代表第一天 1代表第二天 大于6天过期)
          // let isGuoqi = firstDepositUserInfo.day_num > 6;

          //赠送
          if (isNotBuy) {
            this.totalRatio.setText(" +" + safetyNum(cfg == null ? void 0 : cfg.pbfixMaxGiftRate).cToFeeRateNum() + "%");
          } else {
            var _PayUtils$firstPayTot;
            this.totalRatio.setText(" " + Utils.setCurrency((_PayUtils$firstPayTot = PayUtils.firstPayTotalReward) == null ? void 0 : _PayUtils$firstPayTot.cToRateNum()));
          }
          //倒计时
          this.labTimeParent.active = isNotBuy;
          if (isNotBuy) {
            var time = Utils.getLeftTime();
            Utils.timeCountdown3(this.timeLabs, time);
          }
          this.topLayout.getComponent(Layout).updateLayout();

          //倒计时可能隐藏，调整scrollview位置
          this.scheduleOnce(function () {
            var wi = _this2.scrollView.getComponent(Widget);
            wi.top = _this2.topLayout.getComponent(UITransform).height;
            // this.scrollView.child(`view`).getComponent(UITransform).height = this.scrollView.contentSize().height;
          }, 0.1);
          this.infoNot.active = isNotBuy;
          this.infoFirst.active = !isNotBuy;
          //未充值显示信息
          if (isNotBuy) {
            this.infoNot.getComponent(FirstDepositInfoNot).showView(function () {
              _this2.reloadData();
            });
          } else {
            this.infoFirst.getComponent(FirstDepositInfoHad).showView(function () {
              _this2.reloadData();
            });
          }
          this.setBottomRuleLabs();
        };
        _proto.reloadData = function reloadData() {
          var _this3 = this;
          HttpPbFunc.pbfixPayConfReq(this.node, function (result) {
            if (isResponseValid(result)) {
              _this3.showView();
            }
          });
        }

        /**设置底部规则 */;
        _proto.setBottomRuleLabs = function setBottomRuleLabs() {
          var _betReward$pbfixExtra;
          var firstPayConf = gameDataMgr.payConf.pbfixFirstPayConf;
          this.fd_tip_15.setText("fd_tip_15".i18nStr([safetyNum(firstPayConf.pbfixMaxGiftRate).cToFeeRateNum().toString()]));

          //立即充值
          this.fd_tip_17.setText("fd_tip_17".i18nStr([safetyNum(firstPayConf.pbfixImmediateRewardRate).cToFeeRateNum().toString()]));

          //7天签到
          var signTotalRatio = 0;
          var ratioArrCfg = gameDataMgr.payConf.pbfixFirstPayConf.pbfixSevenDayRewardRateList;
          var ratioStrArr = [];
          ratioArrCfg.forEach(function (rewardRate, index) {
            signTotalRatio += safetyNum(rewardRate).cToFeeRateNum();
            var value = safetyNum(rewardRate).cToFeeRateNum();
            if (value > 0) {
              ratioStrArr.push(value.toString());
            }
          });
          ratioStrArr.unshift(signTotalRatio.toString());
          this.fd_tip_19.setText("fd_tip_19".i18nStr(ratioStrArr));
          var betReward = firstPayConf.pbfixBetReward;
          var betValueReward = firstPayConf.pbfixBetValueReward;
          var rakebackRatio = safetyNum(betReward == null ? void 0 : betReward.pbfixReturnToCashPoolRate).cToFeeRateNum().toString();
          var betExampleNum = 100;
          var earn = Utils.setCurrency((betReward == null || (_betReward$pbfixExtra = betReward.pbfixExtractableBetValueRate) == null ? void 0 : _betReward$pbfixExtra.cToFeeRateNum()) / RATE_FEE * betExampleNum);
          this.fd_tip_21.setText("fd_tip_21".i18nStr([rakebackRatio, earn, betExampleNum.toString(), safetyNum(betValueReward == null ? void 0 : betValueReward.pbfixBetValue).cToRateNum().toString(), safetyNum(betValueReward == null ? void 0 : betValueReward.pbfixRewardRate).cToFeeRateNum().toString()]));
        }

        /**点击返回 */;
        _proto.clickBack = function clickBack() {
          this.close();
        };
        return FirstDeposit;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "topLayout", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalRatio", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labTimeParent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "timeLabs", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "infoNot", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "infoFirst", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_15", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_17", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_19", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_21", [_dec13], {
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

System.register("chunks:///_virtual/FirstDepositInfoHad.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UIOpacity, MKStaticViewBase, NGame, gameDataMgr, HttpPbFunc, pbfixClaimedStatus, pbfixFirstPayRewardType, Utils, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixClaimedStatus = module.pbfixClaimedStatus;
      pbfixFirstPayRewardType = module.pbfixFirstPayRewardType;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;
      cclegacy._RF.push({}, "4f9c3+zkrxNMaONiso094uv", "FirstDepositInfoHad", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**还未首充信息 */
      var FirstDepositInfoHad = exports('FirstDepositInfoHad', (_dec = ccclass('FirstDepositInfoHad'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node,
        tooltip: "receive"
      }), _dec10 = property({
        type: Node,
        tooltip: "can not receive"
      }), _dec11 = property({
        type: Node,
        tooltip: "claimed"
      }), _dec12 = property({
        type: Node
      }), _dec13 = property({
        type: Node
      }), _dec14 = property({
        type: Node
      }), _dec15 = property({
        type: Node
      }), _dec16 = property({
        type: Node,
        tooltip: "receive"
      }), _dec17 = property({
        type: Node,
        tooltip: "can not receive"
      }), _dec18 = property({
        type: Node,
        tooltip: "claimed"
      }), _dec19 = property({
        type: Node
      }), _dec20 = property({
        type: Node
      }), _dec21 = property({
        type: Node
      }), _dec22 = property({
        type: Node,
        tooltip: "expired"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(FirstDepositInfoHad, _MKStaticViewBase);
        function FirstDepositInfoHad() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labTopUp", _descriptor, _assertThisInitialized(_this));
          //----------------------------------------------------seven day
          _initializerDefineProperty(_this, "btnSevenDayCanotReceive", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnSevenDayReceive", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnSevenDayClaimed", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sevenDayLab_1", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sevenDayLabs", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sevenDayGou", _descriptor7, _assertThisInitialized(_this));
          //----------------------------------------------------bet reward
          _initializerDefineProperty(_this, "btnBetRewardReceive", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnBetRewardCanotReceive", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnBetRewardClaimed", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labBetRwardRule", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labBetRward", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labCanClaim", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "betRewardGou", _descriptor14, _assertThisInitialized(_this));
          //----------------------------------------------------bet task
          _initializerDefineProperty(_this, "btnBetTaskReceive", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnBetTaskCanotReceive", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnBetTaskClaimed", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labTaskRewardRule", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labTaskReward", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "betTaskGou", _descriptor20, _assertThisInitialized(_this));
          //-----------------------------------------------------
          _initializerDefineProperty(_this, "guoqiBlack", _descriptor21, _assertThisInitialized(_this));
          _this.onGetRewardFunc = void 0;
          return _this;
        }
        var _proto = FirstDepositInfoHad.prototype;
        _proto.showView = function showView(onGetReward) {
          var _firstPayRewardData$p, _toDayData$pbfixClaim, _firstPayConf$pbfixBe, _firstPayConf$pbfixBe2, _betReward$pbfixTotal, _betReward$pbfixClaim, _betReward$pbfixRemai, _betReward$pbfixToday, _firstPayConf$pbfixBe3, _firstPayConf$pbfixBe4, _betValueReward$pbfix, _betValueReward$pbfix2;
          this.onGetRewardFunc = onGetReward;
          var firstPayConf = gameDataMgr.payConf.pbfixFirstPayConf;
          var firstPayRewardData = gameDataMgr.payConf.pbfixFirstPayRewardData;
          var remainDays = firstPayRewardData.pbfixRemainDays;

          //是否过期,首充活动有效期剩余天数小于等于0
          var isGuoqi = remainDays <= 0;
          this.guoqiBlack.forEach(function (blackItem, index) {
            blackItem.active = isGuoqi;
          });

          //立即充值------------------------------
          this.labTopUp.setText("topUpNow".i18nStr([Utils.setCurrency(firstPayRewardData == null || (_firstPayRewardData$p = firstPayRewardData.pbfixImmediateReward) == null || (_firstPayRewardData$p = _firstPayRewardData$p.pbfixAmount) == null ? void 0 : _firstPayRewardData$p.cToRateNum())]));

          //7天签到------------------------------
          var dayRewardTotalRatio = 0;
          var dayRewardTotalBonus = 0;
          firstPayConf.pbfixSevenDayRewardRateList.forEach(function (rate, index) {
            dayRewardTotalRatio += safetyNum(rate).cToFeeRateNum();
          });
          firstPayRewardData.pbfixSevenDailyRewards.forEach(function (dayReward, index) {
            dayRewardTotalBonus += safetyNum(dayReward == null ? void 0 : dayReward.pbfixRewardAmounts).cToRateNum();
          });
          this.sevenDayLab_1.setText("seven_day_program".i18nStr([dayRewardTotalRatio.toString(), Utils.setCurrency(dayRewardTotalBonus)]));
          //每日可领取
          this.sevenDayLabs.children.forEach(function (dayItem, index) {
            var _data$pbfixClaimedSta;
            var data = firstPayRewardData.pbfixSevenDailyRewards[index];
            var state = (_data$pbfixClaimedSta = data.pbfixClaimedStatus) != null ? _data$pbfixClaimedSta : 0;
            if (state == 0) {
              dayItem.active = false;
            } else {
              var _data$pbfixRewardAmou;
              var dayStr = (index + 1).toString();
              var numStr = Utils.setCurrency(data == null || (_data$pbfixRewardAmou = data.pbfixRewardAmounts) == null ? void 0 : _data$pbfixRewardAmou.cToRateNum());
              dayItem.child("text").setText("seven_day_claim".i18nStr([dayStr, numStr]));
              dayItem.child("text").child("line").active = state == pbfixClaimedStatus.pbfixCLAIMED_STATUS_EXPIRED;
              dayItem.child("text").getComponent(UIOpacity).opacity = state == pbfixClaimedStatus.pbfixCLAIMED_STATUS_NOT_YET_AVAILABLE ? 90 : 255;
              dayItem.child("icons").child("expired").active = state == pbfixClaimedStatus.pbfixCLAIMED_STATUS_EXPIRED;
              dayItem.child("icons").child("gou").active = state == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
            }
          });
          //7日领取状态
          var toDayData = firstPayRewardData.pbfixSevenDailyRewards[7 - remainDays];
          var curDayState = (_toDayData$pbfixClaim = toDayData.pbfixClaimedStatus) != null ? _toDayData$pbfixClaim : 0;
          this.btnSevenDayCanotReceive.active = curDayState == pbfixClaimedStatus.pbfixCLAIMED_STATUS_UNDEFINED || remainDays == 7 || curDayState == pbfixClaimedStatus.pbfixCLAIMED_STATUS_NOT_YET_AVAILABLE;
          this.btnSevenDayReceive.active = curDayState == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
          this.btnSevenDayClaimed.active = curDayState == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          this.sevenDayGou.active = remainDays == 1 && curDayState == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          this.onClicked(this.btnSevenDayReceive, this.getReward.bind(this, pbfixFirstPayRewardType.pbfixFIRST_PAY_REWARD_TYPE_DAILY, toDayData.pbfixRewardAmounts));
          var betReward = firstPayRewardData.pbfixBetReward;
          //下注奖励-------------------------------
          this.btnBetRewardCanotReceive.active = betReward.pbfixClaimedStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_NOT_YET_AVAILABLE;
          this.btnBetRewardReceive.active = betReward.pbfixClaimedStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
          this.btnBetRewardClaimed.active = betReward.pbfixClaimedStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          this.betRewardGou.active = remainDays == 1 && betReward.pbfixClaimedStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          var rakebackRatio = safetyNum(firstPayConf == null || (_firstPayConf$pbfixBe = firstPayConf.pbfixBetReward) == null ? void 0 : _firstPayConf$pbfixBe.pbfixReturnToCashPoolRate).cToFeeRateNum().toString();
          var betValueRate = safetyNum(firstPayConf == null || (_firstPayConf$pbfixBe2 = firstPayConf.pbfixBetReward) == null ? void 0 : _firstPayConf$pbfixBe2.pbfixExtractableBetValueRate).cToFeeRateNum().toString();
          this.labBetRwardRule.setText("Label_bet_reward_rule".i18nStr([rakebackRatio, betValueRate]));
          // 
          var totalRewardAmount = Utils.setCurrency(betReward == null || (_betReward$pbfixTotal = betReward.pbfixTotalRewardAmount) == null ? void 0 : _betReward$pbfixTotal.cToRateNum());
          var claimedAmount = Utils.setCurrency(betReward == null || (_betReward$pbfixClaim = betReward.pbfixClaimedAmount) == null ? void 0 : _betReward$pbfixClaim.cToRateNum());
          var remainingRewardAmount = Utils.setCurrency(betReward == null || (_betReward$pbfixRemai = betReward.pbfixRemainingRewardAmount) == null ? void 0 : _betReward$pbfixRemai.cToRateNum());
          this.labBetRward.setText("lab_bet_reward".i18nStr([totalRewardAmount, claimedAmount, remainingRewardAmount]));
          //今日可领取
          this.labCanClaim.setText(Utils.setCurrency(betReward == null || (_betReward$pbfixToday = betReward.pbfixTodayClaimAmount) == null ? void 0 : _betReward$pbfixToday.cToRateNum()));
          this.onClicked(this.btnBetRewardReceive, this.getReward.bind(this, pbfixFirstPayRewardType.pbfixFIRST_PAY_REWARD_TYPE_BET, safetyNum(betReward == null ? void 0 : betReward.pbfixTodayClaimAmount)));

          //下注任务-------------------------------
          var times = safetyNum(firstPayConf == null || (_firstPayConf$pbfixBe3 = firstPayConf.pbfixBetValueReward) == null ? void 0 : _firstPayConf$pbfixBe3.pbfixBetValue).cToRateNum().toString();
          var rewardRate = safetyNum(firstPayConf == null || (_firstPayConf$pbfixBe4 = firstPayConf.pbfixBetValueReward) == null ? void 0 : _firstPayConf$pbfixBe4.pbfixRewardRate).cToFeeRateNum().toString();
          this.labTaskRewardRule.setText("Label_bet_task_rule".i18nStr([times, rewardRate]));
          var betValueReward = firstPayRewardData.pbfixBetValueReward;
          var totalReward = Utils.setCurrency(betValueReward == null || (_betValueReward$pbfix = betValueReward.pbfixTotalRewardAmount) == null ? void 0 : _betValueReward$pbfix.cToRateNum());
          var remainBetValue = Utils.setCurrency(betValueReward == null || (_betValueReward$pbfix2 = betValueReward.pbfixRemainBetValue) == null ? void 0 : _betValueReward$pbfix2.cToRateNum());
          this.labTaskReward.setText("lab_bet_task".i18nStr([totalReward, remainBetValue]));
          //bonus_flag: 活动60倍打码是否领取 0未领取 1已领取;  remain_code:完成首充打码奖励还需的打码量
          var betValueStatus = betValueReward.pbfixClaimedStatus;
          this.btnBetTaskCanotReceive.active = betValueStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_NOT_YET_AVAILABLE;
          this.btnBetTaskClaimed.active = betValueStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          this.btnBetTaskReceive.active = betValueStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
          this.betTaskGou.active = betValueStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
          this.onClicked(this.btnBetTaskReceive, this.getReward.bind(this, pbfixFirstPayRewardType.pbfixFIRST_PAY_REWARD_TYPE_TOTAL_BET, betValueReward.pbfixTotalRewardAmount));
        };
        _proto.getReward = function getReward(rewardType, rewardNum, onGetReward) {
          var _this2 = this;
          HttpPbFunc.pbfixGetFirstPayRewardReq(this.node, rewardType, function (data) {
            NGame.dialog.showGetRewardDialog({
              rewardNum: rewardNum.cToRateNum()
            });
            _this2.onGetRewardFunc == null || _this2.onGetRewardFunc();
          });
        };
        return FirstDepositInfoHad;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labTopUp", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnSevenDayCanotReceive", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnSevenDayReceive", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnSevenDayClaimed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sevenDayLab_1", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sevenDayLabs", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sevenDayGou", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "btnBetRewardReceive", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btnBetRewardCanotReceive", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btnBetRewardClaimed", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "labBetRwardRule", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "labBetRward", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "labCanClaim", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "betRewardGou", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "btnBetTaskReceive", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "btnBetTaskCanotReceive", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "btnBetTaskClaimed", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "labTaskRewardRule", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "labTaskReward", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "betTaskGou", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "guoqiBlack", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstDepositInfoNot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './PayUtils.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UIOpacity, Layout, Tween, tween, instantiate, UITransform, RATE_FEE, MKStaticViewBase, NGame, gameDataMgr, pbfixPaymentSource, GoogleAnalytics, GAEvent, PayUtils, safetyNum, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      Layout = module.Layout;
      Tween = module.Tween;
      tween = module.tween;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
    }, function (module) {
      RATE_FEE = module.RATE_FEE;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;
      cclegacy._RF.push({}, "e6edbzqrNFIFacxxG+hX756", "FirstDepositInfoNot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**还未首充信息 */
      var FirstDepositInfoNot = exports('FirstDepositInfoNot', (_dec = ccclass('FirstDepositInfoNot'), _dec2 = property({
        type: Node,
        tooltip: ""
      }), _dec3 = property({
        type: Node,
        tooltip: ""
      }), _dec4 = property({
        type: Node,
        tooltip: ""
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node,
        tooltip: ""
      }), _dec7 = property({
        type: Node,
        tooltip: ""
      }), _dec8 = property({
        type: Node,
        tooltip: ""
      }), _dec9 = property({
        type: Node,
        tooltip: ""
      }), _dec10 = property({
        type: Node,
        tooltip: ""
      }), _dec11 = property({
        type: Node,
        tooltip: ""
      }), _dec12 = property({
        type: Node,
        tooltip: ""
      }), _dec13 = property({
        type: Node,
        tooltip: ""
      }), _dec14 = property({
        type: Node,
        tooltip: ""
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(FirstDepositInfoNot, _MKStaticViewBase);
        function FirstDepositInfoNot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "formulaDeposit", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "formulaBonus", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "formulaTotal", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "plyersChoseTip", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labCurDeposit", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemParent", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeMask", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sevenDaySign", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_4", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fd_tip_8", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mission1Desc", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mission2Desc", _descriptor13, _assertThisInitialized(_this));
          _this.first_deposit_conf = null;
          _this.amount_list = [];
          _this.curAmount = "0";
          _this.amountIdx = 0;
          _this.defaultShopIdx = 0;
          _this.shopList = [];
          return _this;
        }
        var _proto = FirstDepositInfoNot.prototype;
        _proto.start = function start() {};
        _proto.showView = function showView(onRecharged) {
          var _this$shopList$find$p,
            _this$shopList$find,
            _this2 = this,
            _cfg$pbfixBetReward,
            _cfg$pbfixBetValueRew,
            _cfg$pbfixBetReward2,
            _cfg$pbfixBetValueRew2,
            _cfg$pbfixBetValueRew3;
          var cfg = gameDataMgr.payConf.pbfixFirstPayConf;
          this.first_deposit_conf = cfg;
          if (cfg.pbfixShopList.length <= 10) {
            this.shopList = cfg.pbfixShopList;
          } else {
            this.shopList = cfg.pbfixShopList.slice(0, 10);
          }
          this.curAmount = (_this$shopList$find$p = (_this$shopList$find = this.shopList.find(function (shop) {
            return shop.pbfixId == cfg.pbfixDefaultId;
          })) == null ? void 0 : _this$shopList$find.pbfixPrice.cToRateNum().toString()) != null ? _this$shopList$find$p : "0";
          this.defaultShopIdx = this.shopList.findIndex(function (shop) {
            return shop.pbfixId == cfg.pbfixDefaultId;
          });
          this.defaultShopIdx = this.defaultShopIdx == -1 ? 0 : this.defaultShopIdx;
          this.amountIdx = this.defaultShopIdx;

          //55%玩家选择
          this.plyersChoseTip.getComponent(UIOpacity).opacity = 255;

          //充值信息
          this.setAmountInfo();
          var depositItemWidth = (this.itemParent.contentSize().width - 16) / 2;
          //充值列表
          var _loop = function _loop(i) {
            var item = _this2.itemParent.children[i];
            var shop = _this2.shopList[i];
            if (shop) {
              if (!item) {
                item = instantiate(_this2.itemParent.children[0]);
                item.parent = _this2.itemParent;
              }
              item.getComponent(UITransform).width = depositItemWidth;
              item.child("sel").getComponent(UITransform).width = depositItemWidth + 16;
              item.child("sel").active = shop.pbfixId == cfg.pbfixDefaultId;
              item.child("Label_num").setText(safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum());
              Utils.loadCurrencyIcon(item.child("ic_dollor"));
              var right = item.child("right");
              right.child("heart").active = shop.pbfixId == cfg.pbfixDefaultId;
              var giftRatio = shop.pbfixGiftRatio;
              if (PayUtils.isDailyFirstPayActVail) {
                giftRatio += gameDataMgr.hallConf.pbfixDailyFirstPayGiftRate;
              }
              right.child("Label_add").setText("+" + safetyNum(giftRatio).cToFeeRateNum() + "%");
              _this2.onClicked(item, function () {
                _this2.clickItem(i);
              });
            } else {
              item.active = false;
            }
          };
          for (var i = 0; i < this.shopList.length; i++) {
            _loop(i);
          }
          this.fd_tip_4.setText("fd_tip_4".i18nStr([(safetyNum(cfg.pbfixImmediateRewardRate).cToFeeRateNum() - 100).toString()]));
          this.fd_tip_8.setText("fd_tip_8".i18nStr([(safetyNum(cfg == null || (_cfg$pbfixBetReward = cfg.pbfixBetReward) == null ? void 0 : _cfg$pbfixBetReward.pbfixReturnToCashPoolRate) + safetyNum(cfg == null || (_cfg$pbfixBetValueRew = cfg.pbfixBetValueReward) == null ? void 0 : _cfg$pbfixBetValueRew.pbfixRewardRate)).cToRateNum().toString()]));

          //7天签到
          var sifnConf = cfg.pbfixSevenDayRewardRateList;
          this.sevenDaySign.children.forEach(function (item, index) {
            var _sifnConf;
            var rate = (_sifnConf = sifnConf[index + 1]) != null ? _sifnConf : 0; // 从第二天开始取值
            item.getChildByName("Label_percent").setText((rate != null ? rate : 0).cToFeeRateNum() + "%");
          });
          var betExampleNum = 100;
          var earn = Utils.setCurrency((cfg == null || (_cfg$pbfixBetReward2 = cfg.pbfixBetReward) == null || (_cfg$pbfixBetReward2 = _cfg$pbfixBetReward2.pbfixExtractableBetValueRate) == null ? void 0 : _cfg$pbfixBetReward2.cToFeeRateNum()) / RATE_FEE * betExampleNum);
          this.mission1Desc.setText("fd_tip_12".i18nStr([earn, betExampleNum.toString()]));
          this.mission2Desc.setText("fd_tip_14".i18nStr([safetyNum(cfg == null || (_cfg$pbfixBetValueRew2 = cfg.pbfixBetValueReward) == null ? void 0 : _cfg$pbfixBetValueRew2.pbfixBetValue).cToRateNum().toString(), safetyNum(cfg == null || (_cfg$pbfixBetValueRew3 = cfg.pbfixBetValueReward) == null ? void 0 : _cfg$pbfixBetValueRew3.pbfixRewardRate).cToFeeRateNum().toString()]));

          //虚拟玩家充值轮播
          this.showRandomDeposit();
          this.onClicked(this.btnDeposit, this.clickDeposit.bind(this, onRecharged));
          this.node.getComponent(Layout).updateLayout();
        }

        /**充值金额信息 */;
        _proto.setAmountInfo = function setAmountInfo() {
          var _shop$pbfixPrice, _gameDataMgr$hallConf;
          var shop = this.shopList[this.amountIdx];
          //公式
          this.formulaDeposit.setText(Utils.setCurrency(shop == null || (_shop$pbfixPrice = shop.pbfixPrice) == null ? void 0 : _shop$pbfixPrice.cToRateNum()));
          var total = safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum() * ((safetyNum(shop == null ? void 0 : shop.pbfixGiftRatio) + safetyNum(gameDataMgr == null || (_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixDailyFirstPayGiftRate)).cToFeeRateNum() / RATE_FEE + 1);
          this.formulaTotal.setText(Utils.setCurrency(total));
          this.formulaBonus.setText(Utils.setCurrency(total - safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum()));

          //当前充值
          // this.labCurDeposit.setText(this.curAmount);
        }

        /**虚拟玩家充值轮播 */;
        _proto.showRandomDeposit = function showRandomDeposit() {
          var _this3 = this;
          this.amount_list = [];
          this.shopList.forEach(function (shop) {
            _this3.amount_list.push(safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum().toString());
          });
          var node1 = this.nodeMask.children[0];
          var node2 = this.nodeMask.children[1];
          var dt = 0.2;
          var delay = 2.5;
          var disY = 60;
          node1.y = 0;
          node2.y = -disY;
          this.setRandomDeposit(node1);
          this.setRandomDeposit(node2);
          Tween.stopAllByTarget(this.nodeMask);
          tween(this.nodeMask).repeatForever(tween().delay(delay).call(function () {
            _this3.nodeMask.children.forEach(function (node) {
              tween(node).by(dt, {
                y: disY
              }).call(function () {
                if (node.y >= disY) {
                  _this3.setRandomDeposit(node);
                  node.y = -disY;
                }
              }).start();
            });
          })).start();
        }

        /**设置一天随机充值数据 */;
        _proto.setRandomDeposit = function setRandomDeposit(node) {
          var len = Utils.random(3, 7);
          var playerName = '*'.repeat(len);
          var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          for (var i = 3; i > 0; --i) {
            playerName += chars[Math.floor(Math.random() * chars.length)];
          }
          node.getChildByName("Label_name").setText(playerName);
          node.getChildByName("Label_num").setText(Utils.getRandomElement(this.amount_list)); // this.amount_list 已经是格式化的数据了
        }

        /**设置金额按钮状态 */;
        _proto.setAmountItemState = function setAmountItemState(idx) {
          this.itemParent.children.forEach(function (item, index) {
            item.getChildByName("sel").active = index == idx;
          });
        }

        /**点击金额 */;
        _proto.clickItem = function clickItem(idx) {
          var _this$shopList$idx;
          if (idx == this.amountIdx) return;
          this.amountIdx = idx;
          this.setAmountItemState(idx);
          this.curAmount = safetyNum((_this$shopList$idx = this.shopList[idx]) == null ? void 0 : _this$shopList$idx.pbfixPrice).cToRateNum().toString();
          this.setAmountInfo();

          //55%玩家选择
          this.plyersChoseTip.getComponent(UIOpacity).opacity = idx == this.defaultShopIdx ? 255 : 0;
        }

        /**点击充值 */;
        _proto.clickDeposit = function clickDeposit(onRecharged) {
          var _this4 = this;
          GoogleAnalytics.track(GAEvent.FIRST_RECHARGE_270_DEPOSIT);
          var shop = this.shopList[this.amountIdx];
          if (shop) {
            PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_FIRST_PAY, shop.pbfixPrice, shop.pbfixId, function () {
              if (_this4.isValid) {
                NGame.dialog.showGetRewardDialog({
                  rewardNum: safetyNum(shop == null ? void 0 : shop.pbfixPrice).cToRateNum()
                });
                onRecharged == null || onRecharged();
              }
            });
          }
        };
        return FirstDepositInfoNot;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "formulaDeposit", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "formulaBonus", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "formulaTotal", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "plyersChoseTip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labCurDeposit", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "itemParent", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "nodeMask", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "sevenDaySign", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_4", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "fd_tip_8", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "mission1Desc", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "mission2Desc", [_dec14], {
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

System.register("chunks:///_virtual/FirstDepositLittle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './Utils.ts', './FirstDeposit.ts', './MKExport.ts', './Constant.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, MKViewBase, NGame, gameDataMgr, safetyNum, Utils, FirstDeposit, gloEvent, EventName, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "61c5cfDw9FPHbT82jdIhOvU", "FirstDepositLittle", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 首充+270%弹框
       */
      var FirstDepositLittle = exports('FirstDepositLittle', (_dec = ccclass('FirstDepositLittle'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(FirstDepositLittle, _MKViewBase);
        function FirstDepositLittle() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "btnClose", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalRatio", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "timeLabs", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor4, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = FirstDepositLittle.prototype;
        _proto.start = function start() {
          this.onClicked(this.btnClose, this.clickClose.bind(this));
          this.onClicked(this.btnDeposit, this.clickDeposit.bind(this));
          this.openView();
          GoogleAnalytics.track(GAEvent.POP_UP_DEPOSIT);
        };
        _proto.openView = function openView() {
          var _gameDataMgr$payConf;
          //总的赠送比例
          this.totalRatio.setText("BonusTotalRatio".i18nStr([safetyNum(gameDataMgr == null || (_gameDataMgr$payConf = gameDataMgr.payConf) == null || (_gameDataMgr$payConf = _gameDataMgr$payConf.pbfixFirstPayConf) == null ? void 0 : _gameDataMgr$payConf.pbfixMaxGiftRate).cToFeeRateNum().toString()]));
          //倒计时
          var time = Utils.getLeftTime();
          Utils.timeCountdown3(this.timeLabs, time);
        }

        /**点击返回 */;
        _proto.clickClose = function clickClose() {
          var _this$initData;
          // this.node.active = false;
          GoogleAnalytics.track(GAEvent.POP_UP_DEPOSIT_LATER);
          this.closeView();
          (_this$initData = this.initData) == null || _this$initData.onActClose == null || _this$initData.onActClose();
        };
        _proto.closeView = function closeView() {
          this.close();
          gloEvent.emit(EventName.REMOVE_DIALOG_TOUCH_MASK);
        }

        /**点击充值 */;
        _proto.clickDeposit = function clickDeposit() {
          GoogleAnalytics.track(GAEvent.FIRST_RECHARGE_270);
          this.closeView();
          NGame.uiManage.open(FirstDeposit);
        };
        return FirstDepositLittle;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalRatio", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timeLabs", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec5], {
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

System.register("chunks:///_virtual/FreeBonusWithdraw.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './Constant.ts', './Decorators.ts', './UIHelper.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './Utils.ts', './PayTypeItem.ts', './CantWithdrawToRecharge.ts', './NeedMorePlay.ts', './WidAccountInfoView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, instantiate, GloTitleBar, EventName, StorageKey, inject, UIHelper, UIPath, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, isResponseValid, pbfixMoneyType, GAEvent, GoogleAnalytics, GAParamKey, Utils, safetyNum, PayTypeItem, CantWithdrawToRecharge, NeedMorePlay, WidAccountInfoView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
      StorageKey = module.StorageKey;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixMoneyType = module.pbfixMoneyType;
    }, function (module) {
      GAEvent = module.GAEvent;
      GoogleAnalytics = module.GoogleAnalytics;
      GAParamKey = module.GAParamKey;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      PayTypeItem = module.PayTypeItem;
    }, function (module) {
      CantWithdrawToRecharge = module.CantWithdrawToRecharge;
    }, function (module) {
      NeedMorePlay = module.NeedMorePlay;
    }, function (module) {
      WidAccountInfoView = module.WidAccountInfoView;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "22082q9gCtPn6Lp7S5SNqzq", "FreeBonusWithdraw", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FreeBonusWithdraw = exports('FreeBonusWithdraw', (_dec = ccclass('FreeBonusWithdraw'), _dec2 = inject("GloTitleBar", GloTitleBar), _dec3 = inject("ScrollView/view/content/Bottom1/WidAccountInfoView", Node), _dec4 = inject("ScrollView/view/content/Bottom2/WidAccountInfoView", Node), _dec5 = inject("ScrollView/view/content/Bottom1/widItemParent1", Node), _dec6 = inject("ScrollView/view/content/Bottom2/widItemParent2", Node), _dec7 = inject("ScrollView/view/content/RewardScroller", Node), _dec8 = inject("PayTypeItem", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(FreeBonusWithdraw, _MKViewBase);
        function FreeBonusWithdraw() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widAccountInfoView1", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widAccountInfoView2", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widItemParent1", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widItemParent2", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rewardScroller", _descriptor6, _assertThisInitialized(_this));
          // 奖励轮播
          _initializerDefineProperty(_this, "PayTypeItem", _descriptor7, _assertThisInitialized(_this));
          _this.allNode = null;
          _this.canWithdrawBonus = 0;
          _this.curWithdrawTypeIdx = 0;
          _this.curChannelIdx = 0;
          _this.curContractType = "";
          _this.curIsGuideRecharge = false;
          _this.isReqWidIng = false;
          return _this;
        }
        var _proto = FreeBonusWithdraw.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        }
        // tag: number = 1
        ;

        _proto.open = function open() {
          // this.node.child(`ScrollView`).getComponent(UITransform).height = this.node.contentSize().height - this.gloTitleBar.node.contentSize().height
          this.gloTitleBar.initBar("Bonus Balance Withdrawal".i18nStr(), this.closeView.bind(this));
          this.onClicked(this.allNode.WithdrawlBtn, this.toGuideRecharge.bind(this));
          this.onClicked(this.allNode.WithdrawlBtn2, this.toWithdrawl.bind(this));
          this.swicthTag();
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
          this.scheduleOnce(function () {
            UIHelper.regisUI(CantWithdrawToRecharge, UIPath.CantWithdrawToRecharge);
            UIHelper.regisUI(NeedMorePlay, UIPath.NeedMorePlay);
          }, 0.1);
        }

        /** 侧滑返回上一页 */;
        _proto.onEdgeSwipeBack = function onEdgeSwipeBack(targetNode) {
          if (this.ignoreEdgeSwipeBack(targetNode)) {
            return;
          }
          this.closeView();
        }

        /**展示两种不同的ui */;
        _proto.swicthTag = function swicthTag() {
          var _this2 = this;
          this.allNode.warnImg1.active = false;
          this.allNode.warnImg2.active = false;
          this.allNode.Bottom1.active = false;
          this.allNode.Bottom2.active = false;
          if (this.userInfo.pbfixBalance == 0) {
            // 还未充值过
            this.rewardScroller.active = false;
            this.curIsGuideRecharge = true;
            this.allNode.warnImg1.active = true;
            this.allNode.Bottom1.active = true;
            this.updataGuideRechargeUi();
          } else {
            this.rewardScroller.active = true; // 只有充值过了才展示跑马灯(未充值情况不会展示可提现金额，如果跑马灯展示的都是提现15，玩家会有疑惑)
            this.curIsGuideRecharge = false;
            this.allNode.warnImg2.active = true;
            this.allNode.Bottom2.active = true;
            NGame.loading.show(null, null, false);
            HttpPbFunc.pbfixUserInfoReq(this.node, false, function (res) {
              if (isResponseValid(res)) {
                _this2.updataWithdrawUi();
              }
              NGame.loading.hide();
            });
          }
        }

        /**刷新真正的提现ui */;
        _proto.updataWithdrawUi = function updataWithdrawUi() {
          var _this$userInfo,
            _this3 = this,
            _gameDataMgr$hallConf,
            _this$userInfo2,
            _gameDataMgr$hallConf2;
          this.allNode.myBonus2.setText(Utils.changeMoneyUnit((_this$userInfo = this.userInfo) == null || (_this$userInfo = _this$userInfo.pbfixBonus) == null ? void 0 : _this$userInfo.cToRateNum(), 1));
          this.curWithdrawTypeIdx = 0;
          this.curChannelIdx = 0;
          var len = this.walletList.length;
          this.widItemParent2.removeAllChildren();
          for (var i = 0; i < len; i++) {
            var item = instantiate(this.PayTypeItem);
            item.active = true;
            item.getComponent(PayTypeItem).setData(this.createTypeData(this.walletList[i]), i, function (typeIdx) {
              if (typeIdx != _this3.curWithdrawTypeIdx) {
                _this3.curWithdrawTypeIdx = typeIdx;
                _this3.curChannelIdx = 0;
                _this3.widItemParent2.children.forEach(function (widItem, itemIdx) {
                  if (itemIdx == _this3.curWithdrawTypeIdx) {
                    widItem.getComponent(PayTypeItem).onSelected(_this3.curChannelIdx);
                  } else {
                    widItem.getComponent(PayTypeItem).onNoSelect();
                  }
                });
                _this3.updateWalletByReal();
                // NGame.tips.toast(`curWithdrawTypeIdx = ${this.curWithdrawTypeIdx}, channelIdx = ${this.curChannelIdx}`)
              }
            }, function (channelIdx) {
              _this3.curChannelIdx = channelIdx;
              var info = _this3.walletList[_this3.curWithdrawTypeIdx].pbfixChannelList[_this3.curChannelIdx];
              _this3.widAccountInfoView2.getComponent(WidAccountInfoView).setDefaultAccountInfo(info);
              // NGame.tips.toast(`curWithdrawTypeIdx = ${this.curWithdrawTypeIdx}, channelIdx = ${this.curChannelIdx}`)
            });

            this.widItemParent2.addChild(item);
          }
          this.widItemParent2.children[this.curWithdrawTypeIdx].getComponent(PayTypeItem).onSelected(this.curChannelIdx);
          HttpPbFunc.pbfixWithdrawDataReq(this.node, pbfixMoneyType.pbfixMONEY_TYPE_FREE_BONUS, function (res) {
            _this3.canWithdrawBonus = 0;
            if (isResponseValid(res)) {
              _this3.canWithdrawBonus = res.pbfixAvailableAmount || 0;
            }
            var ddd = _this3.userInfo.pbfixBonus >= _this3.canWithdrawBonus ? _this3.canWithdrawBonus : 0;
            _this3.allNode.widthdddddd.setText(ddd.cToRateNum());
          });
          var limitMoney = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixBonusWMinBalance).cToRateNum();
          this.allNode.label_layout.child('LimitNum').setText(Utils.changeMoneyUnit(limitMoney, 1));
          this.allNode.otherlimitBnus.setText(safetyNum((_this$userInfo2 = this.userInfo) == null ? void 0 : _this$userInfo2.pbfixRemainValueBonus).cToRateNum());
          var dddd = "Fee RateRich".i18nStr([safetyNum((_gameDataMgr$hallConf2 = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf2.pbfixFeeWBonus).cToFeeRateNum() + "%"]);
          this.allNode.FeeLb.setText(dddd);
          this.updateWalletByReal();
        }

        // _curTag = 0
        /**刷新引导提现UI */;
        _proto.updataGuideRechargeUi = function updataGuideRechargeUi() {
          var _this$userInfo3,
            _this4 = this;
          this.allNode.myBonus.setText(Utils.changeMoneyUnit((_this$userInfo3 = this.userInfo) == null || (_this$userInfo3 = _this$userInfo3.pbfixBonus) == null ? void 0 : _this$userInfo3.cToRateNum(), 1));
          this.curWithdrawTypeIdx = 0;
          this.curChannelIdx = 0;
          var len = this.walletList.length;
          this.widItemParent1.removeAllChildren();
          for (var i = 0; i < len; i++) {
            var item = instantiate(this.PayTypeItem);
            item.active = true;
            item.getComponent(PayTypeItem).setData(this.createTypeData(this.walletList[i]), i, function (typeIdx) {
              if (typeIdx != _this4.curWithdrawTypeIdx) {
                _this4.curWithdrawTypeIdx = typeIdx;
                _this4.curChannelIdx = 0;
                _this4.widItemParent1.children.forEach(function (widItem, itemIdx) {
                  if (itemIdx == _this4.curWithdrawTypeIdx) {
                    widItem.getComponent(PayTypeItem).onSelected(_this4.curChannelIdx);
                  } else {
                    widItem.getComponent(PayTypeItem).onNoSelect();
                  }
                });
                _this4.updateWalletByGuide();
                // NGame.tips.toast(`curWithdrawTypeIdx = ${this.curWithdrawTypeIdx}, channelIdx = ${this.curChannelIdx}`)
              }
            }, function (channelIdx) {
              _this4.curChannelIdx = channelIdx;
              var info = _this4.walletList[_this4.curWithdrawTypeIdx].pbfixChannelList[_this4.curChannelIdx];
              _this4.widAccountInfoView1.getComponent(WidAccountInfoView).setDefaultAccountInfo(info);
              // NGame.tips.toast(`curWithdrawTypeIdx = ${this.curWithdrawTypeIdx}, channelIdx = ${this.curChannelIdx}`)
            });

            this.widItemParent1.addChild(item);
          }
          this.widItemParent1.children[this.curWithdrawTypeIdx].getComponent(PayTypeItem).onSelected(this.curChannelIdx);
          this.updateWalletByGuide();
        };
        _proto.updateWalletByGuide = function updateWalletByGuide() {
          var info = this.walletList[this.curWithdrawTypeIdx].pbfixChannelList[this.curChannelIdx];
          this.curContractType = info.pbfixContractTypes[0];
          this.widAccountInfoView1.getComponent(WidAccountInfoView).showView(info);
          // this.widAccountInfoView1.getComponent(WidAccountInfoView).showView(safetyNum(info.pbfixAccountType))
          // this.widAccountInfoView1.getComponent(WidAccountInfoView).showView(this.curWithdrawTypeIdx + 1)
        };

        _proto.updateWalletByReal = function updateWalletByReal() {
          var info = this.walletList[this.curWithdrawTypeIdx].pbfixChannelList[this.curChannelIdx];
          this.curContractType = info.pbfixContractTypes[0];
          this.allNode.Importantbg.active = info.pbfixName == "CASH APP";
          this.widAccountInfoView2.getComponent(WidAccountInfoView).showView(info);
          // this.widAccountInfoView2.getComponent(WidAccountInfoView).showView(safetyNum(info.pbfixAccountType))
          // this.widAccountInfoView2.getComponent(WidAccountInfoView).showView(this.curWithdrawTypeIdx + 1)
        }

        /**针对未充值玩家-->引导用户充值 */;
        _proto.toGuideRecharge = function toGuideRecharge() {
          // const wInfoJson = this.widAccountInfoView1.getComponent(WidAccountInfoView).getWithdrawInfoJson()
          if (!this.widAccountInfoView1.getComponent(WidAccountInfoView).checkAccountValid(true)) {
            this.reportWithdrawInfo(GAEvent.CLICK_WITHDRAWAL_INVALID_FREE, this.widAccountInfoView1);
            return;
          }
          GoogleAnalytics.track(GAEvent.CLICK_WITHDRAWAL_FREE_BONUS_GUIDE);
          this.reportWithdrawInfo(GAEvent.WITHDRAWAL_INFO_FREE, this.widAccountInfoView1);
          var info = this.walletList[this.curWithdrawTypeIdx].pbfixChannelList[this.curChannelIdx];
          var accountInfo = this.widAccountInfoView1.getComponent(WidAccountInfoView).getAccountInfo();
          // `accountInfo = ${JSON.stringify(accountInfo)}`.logI(`u9a9sufb29`)
          NGame.storage.set(info.pbfixAccountType + "_" + info.pbfixChannelId, JSON.stringify(accountInfo));
          NGame.storage.set(StorageKey.FREE_BONUS_WITHDRWA_INFO_VAILD, true);
          var min_bonus = gameDataMgr.hallConf.pbfixBonusWMinBalance;
          var bonus = this.userInfo.pbfixBonus;
          if (bonus < min_bonus) {
            this.openPlayGame(min_bonus - bonus);
            return;
          }
          NGame.uiManage.open(CantWithdrawToRecharge);
          // this.closeView()
        }

        /**
         * 针对已充值玩家-->直接发起提现
         * @returns 
         */;
        _proto.toWithdrawl = function toWithdrawl() {
          var _this5 = this;
          if (!this.widAccountInfoView2.getComponent(WidAccountInfoView).checkAccountValid(true)) {
            this.reportWithdrawInfo(GAEvent.CLICK_WITHDRAWAL_INVALID_FREE, this.widAccountInfoView2);
            return;
          }
          if (this.isReqWidIng) {
            return;
          }
          GoogleAnalytics.track(GAEvent.CLICK_WITHDRAWAL_FREE_BONUS);
          this.reportWithdrawInfo(GAEvent.WITHDRAWAL_INFO_FREE, this.widAccountInfoView2);
          var info = this.walletList[this.curWithdrawTypeIdx].pbfixChannelList[this.curChannelIdx];
          var accountInfo = this.widAccountInfoView2.getComponent(WidAccountInfoView).getAccountInfo();
          // `accountInfo = ${JSON.stringify(accountInfo)}`.logI(`u9a9sufb29`)
          NGame.storage.set(info.pbfixAccountType + "_" + info.pbfixChannelId, JSON.stringify(accountInfo));
          var proValue = this.userInfo.pbfixRemainValueBonus;
          if (proValue > 0) {
            // const tips = "Still need to bet".i18nStr() + safetyNum(proValue).cToRateNum()
            // NGame.tips.toast(tips)
            NGame.tips.toast("Still need to bet".i18nStr() + ("" + proValue.cToRateNum()));
            return;
          }
          var min_bonus = gameDataMgr.hallConf.pbfixBonusWMinBalance;
          var bonus = this.userInfo.pbfixBonus;
          if (bonus < min_bonus) {
            this.openPlayGame(min_bonus - bonus);
            return;
          }
          var moneyType = pbfixMoneyType.pbfixMONEY_TYPE_FREE_BONUS;
          var amount = this.canWithdrawBonus;
          var walletAddress = "";
          var wInfoJson = this.widAccountInfoView2.getComponent(WidAccountInfoView).getWithdrawInfoJson();
          this.isReqWidIng = true;
          HttpPbFunc.pbfixWithdrawReq(this.node, moneyType, amount, info.pbfixTypeId, info.pbfixChannelId, wInfoJson, walletAddress, function (result) {
            _this5.isReqWidIng = false;
          });
        };
        _proto.openHowToUseUSDTView = function openHowToUseUSDTView() {
          // GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.useUSDTRuleView)
        };
        _proto.openPlayGame = function openPlayGame(price) {
          var _this6 = this;
          NGame.uiManage.open(NeedMorePlay, {
            init: {
              needMoreMoney: price,
              onGoPlay: function onGoPlay() {
                _this6.closeView();
              }
            }
          });
        };
        _proto.closeView = function closeView() {
          this.close();
        };
        _proto.createTypeData = function createTypeData(data) {
          return {
            typeName: data.pbfixName,
            typeIconUrl: data.pbfixIconUrl,
            channels: data.pbfixChannelList.map(function (channel) {
              return channel.pbfixName;
            })
          };
        };
        _proto.reportWithdrawInfo = function reportWithdrawInfo(eventName, accountInfoView) {
          try {
            var _reportData;
            // 数据上报
            var info = this.walletList[this.curWithdrawTypeIdx].pbfixChannelList[this.curChannelIdx];
            var wInfoJson = accountInfoView.getComponent(WidAccountInfoView).getWithdrawInfoJson();
            var wInfo = {};
            try {
              wInfo = wInfoJson ? JSON.parse(wInfoJson) || {} : {};
            } catch (error) {}

            // 不重要的数据都放jsonData
            var jsonData = {
              "typeId": info.pbfixTypeId,
              "channelId": info.pbfixChannelId
            };
            var reportData = (_reportData = {}, _reportData[GAParamKey.value] = 15, _reportData["jsonData"] = JSON.stringify(jsonData), _reportData);
            // if (wInfo.email) {
            //     reportData[GAParamKey.m_email] = wInfo.email
            // }
            if (wInfo.account_name) {
              reportData[GAParamKey.account] = wInfo.account_name;
            }
            if (wInfo.account_no) {
              reportData[GAParamKey.serial_number] = wInfo.account_no;
            }
            if (wInfo.expire_date) {
              reportData[GAParamKey.m_date] = wInfo.expire_date;
            }
            reportData[GAParamKey.jsonData] = JSON.stringify(jsonData);
            GoogleAnalytics.track(eventName, reportData);
          } catch (error) {}
        };
        _createClass(FreeBonusWithdraw, [{
          key: "userInfo",
          get: function get() {
            return gameDataMgr.userInfo;
          }
        }, {
          key: "walletList",
          get: function get() {
            return gameDataMgr.withdrawTypeList;
          }
        }]);
        return FreeBonusWithdraw;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "widAccountInfoView1", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "widAccountInfoView2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "widItemParent1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "widItemParent2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rewardScroller", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "PayTypeItem", [_dec8], {
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

System.register("chunks:///_virtual/FundDetailPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DatePicker2.ts', './GloTitleBar.ts', './Constant.ts', './Decorators.ts', './VScrollView.ts', './MKViewBase.ts', './NGame.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, instantiate, UIOpacity, Button, DatePicker2, GloTitleBar, EventName, inject, VirtualScrollView, MKViewBase, NGame, HttpPbFunc, isResponseValid, pbfixFundType, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
    }, function (module) {
      DatePicker2 = module.DatePicker2;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixFundType = module.pbfixFundType;
    }, function (module) {
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "885538ppa1DlY6cIObxvgfu", "FundDetailPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FundDetailPage = exports('FundDetailPage', (_dec = ccclass('FundDetailPage'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = inject("info_layout/ListLayOut/page_info", Node), _dec10 = inject("info_layout/ListLayOut/listView", VirtualScrollView), _dec11 = inject("info_layout/Topinfo/GloTitleBar", GloTitleBar), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(FundDetailPage, _MKViewBase);
        function FundDetailPage() {
          var _this$MoneyTypeDescri;
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "btnCalendar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labDate", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "calendarPre", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnLeft", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRight", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labPage", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "noData", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomPageNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "listView", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor10, _assertThisInitialized(_this));
          _this.calendarNode = null;
          /**当前页数 从1开始 */
          _this.curPage = 1;
          _this.startDate = "";
          _this.endDate = "";
          _this.selectedStartDate = null;
          _this.selectedEndDate = null;
          // private resultData: payment.FundDetailRes;
          _this.detailList = [];
          /**
          * 资金类型英文描述映射表
          */
          _this.MoneyTypeDescriptionEnMap = (_this$MoneyTypeDescri = {}, _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_UNDEFINED] = "Unknown Type".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_RECHARGE_COMMON] = "Recharge".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WHEEL_ACTIVITY_RECHARGE] = "Wheel Recharge".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_REG_GIFT] = "Registration Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_RECHARGE_GIFT] = "Recharge Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_DAILY_FIRST_RECHARGE_GIFT] = "Daily First Recharge Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_CHECKIN_GIFT] = "Check-in Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WEEKLY_CARD_GIFT] = "Weekly Card Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WHEEL_ACTIVITY_GIFT] = "Wheel Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WHEEL_ACTIVITY_WINNING] = "Wheel Prize".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_VIP_ACTIVITY_GIFT] = "VIP Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_BANKUP_GIFT] = "Bankrupt Bonus".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_FIRST_PAY_REWARD_CHECKIN] = "First recharge check in".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_FIRST_PAY_REWARD_BET] = "First recharge bet reward".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_FIRST_PAY_REWARD_BET_VALUE] = "First recharge bet value reward".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_REWARD_PLAYER] = "Invite Reward".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_REWARD_ACHIEVEMENT] = "Invite Achievement Reward".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_RECHARGE_COMMISSION] = "Invitation Recharge Rebate".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_BET_COMMISSION_LEVEL1] = "Lv1 Bet Rebate".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_BET_COMMISSION_LEVEL2] = "Lv2 Bet Rebate".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_INVITATION_BET_COMMISSION_LEVEL3] = "Lv3 Bet Rebate".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_CASH_POOL_EXTRACT] = "Cash/Pool Extract".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_FLOW_OUT] = "Transfer Out".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_FLOW_IN] = "Transfer In".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WITHDRAW] = "ReleaseBack".i18nStr(), _this$MoneyTypeDescri[pbfixFundType.pbfixFUND_TYPE_WITHDRAW_RETURN] = "ReleaseBack Return".i18nStr(), _this$MoneyTypeDescri);
          return _this;
        }
        var _proto = FundDetailPage.prototype;
        _proto.open = function open() {
          var _this2 = this;
          this.gloTitleBar.initBar("Fund Details".i18nStr(), this.close);
          this.onClicked(this.btnCalendar, this.clickCalendar.bind(this));
          // this.onClicked(this.btnBack, this.closeView.bind(this));
          this.onClicked(this.btnLeft, this.clickLeft.bind(this));
          this.onClicked(this.btnRight, this.clickRight.bind(this));
          this.listView.renderItemFn = function (item, index) {
            var _data$pbfixAmount;
            var data = _this2.detailList[index];
            item.child("bg").active = index % 2 == 0;
            item.child("content").child("Type").setText(_this2.getMoneyTypeDescriptionEn(data.pbfixFundType));
            item.child("content").child("amount").setText(Utils.setCurrency((_data$pbfixAmount = data.pbfixAmount) == null ? void 0 : _data$pbfixAmount.cToRateNum()));
            item.child("content").child("time").setText(Utils.formatTime(data.pbfixCreateTime, "YYYY-MM-DD\nHH:mm:ss"));
          };
          this.selectedStartDate = new Date();
          this.selectedEndDate = new Date();
          this.startDate = Utils.formatTime(this.selectedStartDate.getTime(), 'YYYY-MM-DD');
          this.endDate = Utils.formatTime(this.selectedEndDate.getTime(), 'YYYY-MM-DD');
          this.updateLabDate();
          this.qryDataList(1);
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        }

        /** 侧滑返回上一页 */;
        _proto.onEdgeSwipeBack = function onEdgeSwipeBack(targetNode) {
          if (this.ignoreEdgeSwipeBack(targetNode)) {
            return;
          }
          this.close();
        };
        _proto.qryDataList = function qryDataList(page) {
          var _this3 = this;
          this.noData.active = false;
          NGame.loading.show(null, null, false);
          var onNoData = function onNoData() {
            _this3.noData.active = true;
            _this3.updateButtomBtnsState(0);
            _this3.listView.refreshList([]);
          };
          HttpPbFunc.pbfixFundDetailReq(this.node, this.startDate, this.endDate, page, 20, function (result) {
            NGame.loading.hide();
            if (isResponseValid(result)) {
              var resultData = result;
              _this3.detailList = resultData.pbfixFundDetailList.filter(function (data) {
                return data.pbfixFundType != pbfixFundType.pbfixFUND_TYPE_UNDEFINED && data.pbfixFundType != pbfixFundType.pbfixFUND_TYPE_FLOW_OUT && data.pbfixFundType != pbfixFundType.pbfixFUND_TYPE_FLOW_IN;
              });
              if (_this3.detailList.length > 0) {
                _this3.updateButtomBtnsState(_this3.detailList.length);
                _this3.listView.refreshList(_this3.detailList);
              } else {
                onNoData();
              }
            } else {
              onNoData();
            }
          });
        }

        /**点击日历 */;
        _proto.clickCalendar = function clickCalendar() {
          var _this4 = this;
          if (!this.calendarNode) {
            this.calendarNode = instantiate(this.calendarPre);
            this.calendarNode.parent = this.node;
            this.calendarNode.getComponent(DatePicker2).setSelectCall(function (startDate, endDate) {
              _this4.onSelectDate(startDate, endDate);
            });
          }
          this.calendarNode.active = true;
          this.calendarNode.getComponent(DatePicker2).initCalendar(this.selectedStartDate, this.selectedEndDate);
        };
        _proto.onSelectDate = function onSelectDate(startDate, endDate) {
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.startDate = Utils.formatTime(startDate.getTime(), 'YYYY-MM-DD');
          this.endDate = Utils.formatTime(endDate.getTime(), 'YYYY-MM-DD');
          this.qryDataList(1);
          this.updateLabDate();
        };
        _proto.updateLabDate = function updateLabDate() {
          this.labDate.setText(Utils.formatTime(this.selectedStartDate.getTime(), 'YYYY/MM/DD') + " - " + Utils.formatTime(this.selectedEndDate.getTime(), 'YYYY/MM/DD'));
        }

        // closeView() {
        //     this.closeCall && this.closeCall();
        // }
        ;

        _proto.clickLeft = function clickLeft() {
          if (this.curPage <= 1) return;
          this.curPage--;
          this.qryDataList(this.curPage);
        };
        _proto.clickRight = function clickRight() {
          // if (this.dataList.length < this.limit) return;
          this.curPage++;
          this.qryDataList(this.curPage);
        };
        _proto.updateButtomBtnsState = function updateButtomBtnsState(totalSize) {
          if (totalSize == 0) {
            this.bottomPageNode.active = false;
            return;
          }
          this.bottomPageNode.active = true;
          this.labPage.setText(this.curPage);
          var leftBtnCanClick = this.curPage > 1;
          this.btnLeft.getComponent(UIOpacity).opacity = leftBtnCanClick ? 255 : 50;
          this.btnLeft.getComponent(Button).interactable = leftBtnCanClick;
          var rightBtnCanClick = this.curPage < totalSize / 20;
          this.btnRight.getComponent(UIOpacity).opacity = rightBtnCanClick ? 255 : 50;
          this.btnRight.getComponent(Button).interactable = rightBtnCanClick;
        };
        /**
         * 根据资金类型枚举返回对应的英文描述（使用映射表方式）
         * @param moneyType 资金类型枚举值
         * @returns 资金类型的英文描述
         */
        _proto.getMoneyTypeDescriptionEn = function getMoneyTypeDescriptionEn(moneyType) {
          return this.MoneyTypeDescriptionEnMap[moneyType] || "Unknown Type";
        };
        return FundDetailPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCalendar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labDate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "calendarPre", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnLeft", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnRight", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labPage", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "noData", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bottomPageNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec11], {
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

System.register("chunks:///_virtual/GameBaseItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './UIHelper.ts', './MKExport.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './CommonUtils.ts', './Utils.ts', './WebGameUtils.ts', './BankruptcyGuide.ts', './InsufficientBalanceDialog.ts', './SelBalanceTypeDialog.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, ImageAsset, SpriteFrame, Sprite, tween, v2, v3, isValid, EventName, StorageKey, MoneyType, inject, UIHelper, UIPath, gloEvent, MKStaticViewBase, NGame, gameDataMgr, CommonUtils, safetyNum, WebGameUtils, BankruptcyGuide, InsufficientBalanceDialog, SelBalanceTypeDialog, GoogleAnalytics, GAEvent, GAParamKey;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      ImageAsset = module.ImageAsset;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      tween = module.tween;
      v2 = module.v2;
      v3 = module.v3;
      isValid = module.isValid;
    }, function (module) {
      EventName = module.EventName;
      StorageKey = module.StorageKey;
      MoneyType = module.MoneyType;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      CommonUtils = module.CommonUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
    }, function (module) {
      WebGameUtils = module.WebGameUtils;
    }, function (module) {
      BankruptcyGuide = module.BankruptcyGuide;
    }, function (module) {
      InsufficientBalanceDialog = module.InsufficientBalanceDialog;
    }, function (module) {
      SelBalanceTypeDialog = module.SelBalanceTypeDialog;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
      GAParamKey = module.GAParamKey;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3;
      cclegacy._RF.push({}, "1d413RmrWtD3Y1v448WZEtU", "GameBaseItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameBaseItem = exports('GameBaseItem', (_dec = ccclass('GameBaseItem'), _dec2 = inject("ic", Node), _dec3 = inject("gameName", Node), _dec4 = inject("HearNode", Node), _dec5 = inject("costBtns", Node), _dec6 = inject("tag_new", Node), _dec7 = inject("tag_hot", Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(GameBaseItem, _MKStaticViewBase);
        function GameBaseItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "icon", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameName", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "hearNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "costBtns", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "newTagNode", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "hotTagNode", _descriptor6, _assertThisInitialized(_this));
          _this.gameData = void 0;
          _this.baseGameIcSp = void 0;
          _this.iconSprite = void 0;
          _this.hear1Node = void 0;
          _this.hear2Node = void 0;
          _this.isLoved = false;
          _this.loadIconCallback = null;
          _this.onClickLoveFunc = null;
          return _this;
        }
        GameBaseItem.hasCachedIcon = function hasCachedIcon(url) {
          return this.iconSpriteFrameCache.has(url);
        };
        GameBaseItem.preloadIcon = function preloadIcon(url, target) {
          return this.requestIconSpriteFrame(url, target);
        };
        GameBaseItem.requestIconSpriteFrame = function requestIconSpriteFrame(url, target) {
          var _this2 = this;
          if (!url) {
            return Promise.resolve(null);
          }
          var cachedSpriteFrame = this.iconSpriteFrameCache.get(url);
          if (cachedSpriteFrame) {
            return Promise.resolve(cachedSpriteFrame);
          }
          var loadingPromise = this.iconSpriteFrameLoadingMap.get(url);
          if (loadingPromise) {
            return loadingPromise;
          }
          var promise = new Promise(function (resolve) {
            NGame.asset.get(url, ImageAsset, target, {
              remoteOption: {
                ext: ".png"
              },
              retryNum: 3,
              completedFunc: function completedFunc(error, ia) {
                if (error || !ia) {
                  resolve(null);
                  return;
                }
                var spriteFrame = _this2.iconSpriteFrameCache.get(url) || SpriteFrame.createWithImage(ia);
                if (spriteFrame) {
                  _this2.iconSpriteFrameCache.set(url, spriteFrame);
                  resolve(spriteFrame);
                  return;
                }
                resolve(null);
              }
            });
          })["finally"](function () {
            _this2.iconSpriteFrameLoadingMap["delete"](url);
          });
          this.iconSpriteFrameLoadingMap.set(url, promise);
          return promise;
        };
        var _proto = GameBaseItem.prototype;
        _proto.onLoad = function onLoad() {
          var _this3 = this;
          this.hearNode.active = !gameDataMgr.isGoStraightToHall;
          this.iconSprite = this.icon.getComponent(Sprite);
          this.hear1Node = this.hearNode.getChildByName("hear1");
          this.hear2Node = this.hearNode.getChildByName("hear2");
          // UIController.addTouchEvent(this.icon, this.onClickGameItem.bind(this), 1.5, false, false, this)
          // UIController.addTouchEvent(this.hearNode, this.onClickLoveBtn.bind(this), 0.5, false, true, this)

          // this.checkNodeClickValid(this.icon, (isValidClick: boolean, e: EventTouch) => {
          //     if (isValidClick) {
          //         e.propagationStopped = true;
          //         this.onClickGameItem();
          //         e.propagationStopped = false;
          //     }
          // }, false)

          this.onClicked(this.icon, function () {
            _this3.onClickGameItem();
          }, false, 1.5, false);
          // this.checkNodeClickValid(this.icon, (isValidClick: boolean, e: EventTouch) => {
          //     if (isValidClick) {
          //         e.propagationStopped = true;
          //         this.onClickGameItem();
          //         e.propagationStopped = false;
          //     }
          // }, false)

          var hearNodeOriScale = this.hearNode.scale.clone();
          this.checkNodeClickValid(this.hearNode, function (isValidClick, e) {
            if (isValidClick) {
              e.propagationStopped = true;
              tween(_this3.hearNode).to(0.02, {
                scale: hearNodeOriScale
              }).delay(0.02).call(function () {
                _this3.onClickLoveBtn();
                e.propagationStopped = false;
              }).bindNodeState(false).start();
            } else {
              _this3.hearNode.scale = hearNodeOriScale;
            }
          }, true);
        };
        _proto.checkNodeClickValid = function checkNodeClickValid(node, onClicked, showAnim) {
          var nodeTouchStartPos = v2();
          var nodeOriScale = node.scale.clone();
          node.on(Node.EventType.TOUCH_END, function (e) {
            var currentPos = e.getUILocation();
            var deltaX = currentPos.x - nodeTouchStartPos.x;
            var deltaY = currentPos.y - nodeTouchStartPos.y;
            onClicked(deltaX * deltaX + deltaY * deltaY <= 25, e);
          }, this);
          node.on(Node.EventType.TOUCH_START, function (e) {
            if (showAnim) {
              node.scale = v3(nodeOriScale.x * 0.9, nodeOriScale.y * 0.9, 1);
            }
            e.getUILocation(nodeTouchStartPos);
          }, this);
        };
        _proto.showIconData = function showIconData(gameData, baseGameIcSp, isLoved) {
          var _this$gameData;
          if (((_this$gameData = this.gameData) == null ? void 0 : _this$gameData.pbfixId) === gameData.pbfixId && this.baseGameIcSp === baseGameIcSp && this.isLoved === isLoved) {
            return;
          }
          this.unuse();
          this.gameData = gameData;
          this.baseGameIcSp = baseGameIcSp;
          this.icon.scale = v3(1, 1, 1);
          var cachedSpriteFrame = GameBaseItem.iconSpriteFrameCache.get(this.gameData.pbfixIcon);
          if (cachedSpriteFrame) {
            this.applyIconSpriteFrame(cachedSpriteFrame);
          } else {
            this.loadBaseIcon();
          }
          this.hotTagNode.active = this.gameData.pbfixIsHot;
          if (!this.gameData.pbfixIsHot) {
            // 如果同时配置了isHot和isNew，优先显示isHot
            this.newTagNode.active = this.gameData.pbfixIsNew;
          }
          this.setLoveState(isLoved);
          if (!cachedSpriteFrame) {
            this.scheduleOnce(this.loadUrlIcon, GameBaseItem.ICON_LOAD_DELAY);
          }
        };
        _proto.loadUrlIcon = function loadUrlIcon() {
          var _this4 = this;
          if (!isValid(this.node) || !this.gameData) {
            return;
          }
          var iconUrl = this.gameData.pbfixIcon;
          var gameId = this.gameData.pbfixId;
          var cachedSpriteFrame = GameBaseItem.iconSpriteFrameCache.get(iconUrl);
          if (cachedSpriteFrame) {
            this.applyIconSpriteFrame(cachedSpriteFrame);
            return;
          }
          this.node["gameId"] = gameId;
          GameBaseItem.requestIconSpriteFrame(iconUrl, this.node).then(function (spriteFrame) {
            if (!isValid(_this4.node)) {
              return;
            }
            if (!spriteFrame) {
              var _this4$gameData;
              if (((_this4$gameData = _this4.gameData) == null ? void 0 : _this4$gameData.pbfixId) === gameId) {
                _this4.loadBaseIcon();
              }
              return;
            }
            if (!_this4.gameData) {
              return;
            }
            if (_this4.node["gameId"] !== gameId || _this4.gameData.pbfixIcon !== iconUrl) {
              return;
            }
            _this4.applyIconSpriteFrame(spriteFrame);
          });
        };
        _proto.loadBaseIcon = function loadBaseIcon() {
          this.icon.active = true;
          this.gameName.setText(this.gameData.pbfixName);
          this.iconSprite.spriteFrame = this.baseGameIcSp;
        };
        _proto.applyIconSpriteFrame = function applyIconSpriteFrame(spriteFrame) {
          this.gameName.active = false;
          this.icon.scale = v3(1, 1, 1);
          this.iconSprite.spriteFrame = spriteFrame;
          // GameBaseItem.loadIcCount ++;
          // if (GameBaseItem.loadIcTotalCount == GameBaseItem.loadIcCount) {
          //     NGame.tips.toast(`全部渲染完了~~~~~~~~`)
          // }
        };

        _proto.setLoveState = function setLoveState(isLoved) {
          this.isLoved = isLoved;
          if (this.hear1Node) {
            this.hear1Node.active = !isLoved;
          }
          if (this.hear2Node) {
            this.hear2Node.active = isLoved;
          }
        }

        /**
         * 点击单个游戏图标
         * @param gid 
         */;
        _proto.onClickGameItem = function onClickGameItem() {
          var _GoogleAnalytics$trac,
            _this5 = this;
          var gameId = this.gameData.pbfixId || "";
          GoogleAnalytics.track(GAEvent.CLICK_GAME_ICON, (_GoogleAnalytics$trac = {}, _GoogleAnalytics$trac[GAParamKey.game_id] = gameId, _GoogleAnalytics$trac));
          if (gameDataMgr.isGoStraightToHall) {
            GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
            gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
            return;
          }
          CommonUtils.requestWakeLock();
          var _confirmCallback = function confirmCallback(hasShowCurrencyDialog) {
            if (hasShowCurrencyDialog === void 0) {
              hasShowCurrencyDialog = false;
            }
            var costType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, MoneyType.MONEY_TYPE_FREE_BONUS);
            if (costType == MoneyType.MONEY_TYPE_BALANCE) {
              if (hasShowCurrencyDialog) {
                // 如果已经弹了币种选择弹框，直接进入游戏，不要再弹其他弹框，避免用户反感！
                WebGameUtils.openWebGame(_this5.node, _this5.gameData.pbfixId, costType, _this5.gameData.pbfixOrientation);
              } else {
                var balance = safetyNum(gameDataMgr.userInfo.pbfixBalance);
                if (balance < safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine)) {
                  NGame.uiManage.open(BankruptcyGuide, {
                    init: {
                      onEnterGame: function onEnterGame() {
                        WebGameUtils.openWebGame(_this5.node, _this5.gameData.pbfixId, costType, _this5.gameData.pbfixOrientation);
                      }
                    }
                  });
                } else {
                  WebGameUtils.openWebGame(_this5.node, _this5.gameData.pbfixId, costType, _this5.gameData.pbfixOrientation);
                }
              }
            } else {
              WebGameUtils.openWebGame(_this5.node, _this5.gameData.pbfixId, costType, _this5.gameData.pbfixOrientation);
            }
          };

          // 1. 先判断【首次币种选择弹框】
          if (this.needShowSelBalanceTypeDialog()) {
            UIHelper.openUI(SelBalanceTypeDialog, UIPath.SelBalanceTypeDialog, undefined, {
              init: {
                confirmCallback: function confirmCallback() {
                  _confirmCallback(true);
                }
              }
            });
            return;
          }
          if (this.needShowSwitchBubbleAnim()) {
            gloEvent.emit(EventName.SHOW_SWITICH_CURRENCY_BUBBLE_ANI);
          }

          // 2. 再判断【余额不足弹框】
          if (this.needShowInsufficientBalanceDialog()) {
            UIHelper.openUI(InsufficientBalanceDialog, UIPath.InsufficientBalanceDialog, undefined, {
              init: {
                confirmCallback: function confirmCallback() {
                  _confirmCallback(true);
                }
              }
            });
            return;
          }
          _confirmCallback();
        }

        /**
         * 是否需要弹出币种选择弹框（玩家cash有余额，并且当前选择的币种是Bonus）
         * @returns
         */;
        _proto.needShowSelBalanceTypeDialog = function needShowSelBalanceTypeDialog() {
          // const minEntry = this.gameData.minEntryAmount;    // 获取最小入场门槛  
          var bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
          var cashBalance = safetyNum(gameDataMgr.userInfo.pbfixBalance);
          var bonusBalance = safetyNum(gameDataMgr.userInfo.pbfixBonus);
          var curSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);

          // 1. 优先判断【首次币种选择弹框】
          var hasShowSel = NGame.storage.get(StorageKey.HAS_SHOW_SEL_BALANCE_TYPE_DIALOG);
          if (hasShowSel) {
            return false;
          }

          // 当前选择赠金，并且cash有余额
          if (curSelType == MoneyType.MONEY_TYPE_FREE_BONUS && cashBalance >= bankruptcyLine) {
            return true;
          }

          // 当前选择cash，并且赠金有余额
          if (curSelType == MoneyType.MONEY_TYPE_BALANCE && bonusBalance >= bankruptcyLine) {
            return true;
          }
          return false;
        }

        /**
         * 是否需要弹出余额不足弹框（玩家余额不足的情况下弹出）
         * @returns 
         */;
        _proto.needShowInsufficientBalanceDialog = function needShowInsufficientBalanceDialog() {
          // const hasShowInsuff = NGame.storage.get(StorageKey.HAS_SHOW_INSUFFICIENT_BALANCE_DIALOG);
          var isNotShowAgain = NGame.storage.get(StorageKey.SEL_NOT_SHOW_INSUFFICIENT_BALANCE_DIALOG);

          // 已勾选不再提示
          if (isNotShowAgain) {
            return false;
          }

          // 当前选择赠金，并且余额低于破产线
          // if (curSelType == MoneyType.MONEY_TYPE_FREE_BONUS && bonusBalance < bankruptcyLine) {
          //     return true;
          // }

          // // 当前选择cash，并且余额低于破产线
          // if (curSelType == MoneyType.MONEY_TYPE_BALANCE && cashBalance < bankruptcyLine) {   
          //     return true;
          // }

          return this.needShowSwitchBubbleAnim();
        }

        /**
         * 是否需要弹出切换币种气泡动效（SwitchBubbleAnim）
         * @return boolean
         */;
        _proto.needShowSwitchBubbleAnim = function needShowSwitchBubbleAnim() {
          // const minEntry = this.gameData.minEntryAmount;    // 获取最小入场门槛  
          var bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
          var cashBalance = safetyNum(gameDataMgr.userInfo.pbfixBalance);
          var bonusBalance = safetyNum(gameDataMgr.userInfo.pbfixBonus);
          var curSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);

          // 当前选择赠金，并且余额低于破产线
          if (curSelType == MoneyType.MONEY_TYPE_FREE_BONUS && bonusBalance < bankruptcyLine) {
            return true;
          }

          // 当前选择cash，并且余额低于破产线
          if (curSelType == MoneyType.MONEY_TYPE_BALANCE && cashBalance < bankruptcyLine) {
            return true;
          }
          return false;
        };
        _proto.onClickLoveBtn = function onClickLoveBtn() {
          var _this$onClickLoveFunc;
          if (gameDataMgr.isGoStraightToHall) {
            GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
            gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
            return;
          }
          var gameId = this.gameData.pbfixId || "";
          if (this.isLoved) {
            var _GoogleAnalytics$trac2;
            GoogleAnalytics.track(GAEvent.CLICK_GAME_LOVE_CANCEL, (_GoogleAnalytics$trac2 = {}, _GoogleAnalytics$trac2[GAParamKey.game_id] = gameId, _GoogleAnalytics$trac2));
          } else {
            var _GoogleAnalytics$trac3;
            GoogleAnalytics.track(GAEvent.CLICK_GAME_LOVE, (_GoogleAnalytics$trac3 = {}, _GoogleAnalytics$trac3[GAParamKey.game_id] = gameId, _GoogleAnalytics$trac3));
          }
          var nextLoveState = !this.isLoved;
          this.setLoveState(nextLoveState);
          var id = this.gameData.pbfixId;
          (_this$onClickLoveFunc = this.onClickLoveFunc) == null || _this$onClickLoveFunc.call(this, id, nextLoveState);
          WebGameUtils.addToCollectGameTask(this.node, id, nextLoveState);

          // HttpPbFunc.reqCollectGame(this.node, this.gameData.pbfixId, nextLoveState, (isDone: boolean) => {
          //     // if (isDone) {
          //     //     this.setLoveState(nextLoveState)
          //     //     this.onClickLoveFunc?.();
          //     // }

          // })
        };

        _proto.unuse = function unuse() {
          this.unschedule(this.loadUrlIcon);
          this.gameData = null;
          // `unuse`.logI(`jiod890f923h9r`)
          this.loadIconCallback = null;
          this.gameName.active = false;
          this.node["gameId"] = null;
          // this.icon.scale = v3(1, 1, 1)
          this.isLoved = false;
        };
        _proto.reuse = function reuse() {
          // `reuse`.logI(`jiod890f923h9r`)
        };
        return GameBaseItem;
      }(MKStaticViewBase), _class3.iconSpriteFrameCache = new Map(), _class3.iconSpriteFrameLoadingMap = new Map(), _class3.ICON_LOAD_DELAY = 0.08, _class3.loadIcTotalCount = 0, _class3.loadIcCount = 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hearNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "costBtns", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "newTagNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "hotTagNode", [_dec7], {
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

System.register("chunks:///_virtual/GameSearch.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, EditBox, UIOpacity, ImageAsset, SpriteFrame, Sprite, instantiate, MKViewBase, NGame, gameDataMgr, UIController, Utils;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
      UIOpacity = module.UIOpacity;
      ImageAsset = module.ImageAsset;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      instantiate = module.instantiate;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "b84c90Yx5hMLYpIY/mLxhYw", "GameSearch", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameSearch = exports('GameSearch', (_dec = ccclass('GameSearch'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(GameSearch, _MKViewBase);
        function GameSearch() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = {};
          _this.curLen = 0;
          _this.isInet = false;
          _this.gameListNode = [];
          return _this;
        }
        var _proto = GameSearch.prototype;
        _proto.onLoad = function onLoad() {
          "onLoad".logI("udu9disuf783");
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.start = function start() {
          var _this2 = this;
          "start".logI("udu9disuf783");
          this.onClicked(this.allNode.xialaBtn, function () {
            _this2.closeView();
          });
          this.onClicked(this.allNode.blackBg, function () {
            _this2.closeView();
          });
          this.allNode.sEditBox.on('text-changed', this.onEditBoxTextChanged, this);
          this.PopUpView();
          this.onEditBoxTextChanged(this.allNode.sEditBox.getComponent(EditBox));
          this.initHistory();
        };
        _proto.onEditBoxTextChanged = function onEditBoxTextChanged(editBox) {
          var text = editBox.string;
          if (text == "") {
            this.allNode.ResutltTag.active = false;
            this.allNode.resultList.active = false;
            this.allNode.PopularTag.active = true;
            this.allNode.PopularList.active = true;
            this.allNode.topDesc2.active = false;
            this.allNode.topDesc.active = true;
            this.allNode.nodata.active = false;
            this.initHistory();
          }
          if (text.length >= 3) {
            this.allNode.ResutltTag.active = true;
            this.allNode.resultList.active = true;
            this.allNode.PopularTag.active = false;
            this.allNode.PopularList.active = false;
            this.allNode.HistoyTag.active = false;
            this.allNode.historyList.active = false;
            this.updateGameList(text);
          }
        };
        _proto.initHistory = function initHistory() {
          var _this3 = this;
          var gameSearchLog = gameDataMgr.gameSearchLog;
          var hasSearchLog = gameSearchLog.length > 0;
          this.allNode.HistoyTag.active = hasSearchLog;
          this.allNode.historyList.active = hasSearchLog;
          this.onClicked(this.allNode.hdelate, function () {
            gameDataMgr.gameSearchLog = [];
            _this3.initHistory();
          });
          if (this.curLen != gameSearchLog.length) {
            this.curLen = gameSearchLog.length;
            this.allNode.historyList.removeAllChildren();
            var _loop = function _loop() {
              var item = instantiate(_this3.allNode.historyItem);
              item.parent = _this3.allNode.historyList;
              item.active = true;
              item.name = gameSearchLog[i];
              item.child('name').setText(gameSearchLog[i].ellipsis(8));
              _this3.onClicked(item.child('name'), function () {
                _this3.allNode.sEditBox.getComponent(EditBox).string = item.name;
                _this3.onEditBoxTextChanged(_this3.allNode.sEditBox.getComponent(EditBox));
              });

              // 删除一条日志
              _this3.onClicked(item.child('Close'), function () {
                var data = Utils.deepCopy(gameSearchLog);
                var indx = data.indexOf(item.name);
                data.splice(indx, 1);
                gameDataMgr.gameSearchLog = data;
                _this3.initHistory();
              });
            };
            for (var i = 0; i < gameSearchLog.length; i++) {
              _loop();
            }
          }
        };
        _proto.PopUpView = function PopUpView() {
          if (this.isInet) {
            return;
          }
          this.isInet = true;
          var hotGameList = gameDataMgr.gameListData.pbfixGames.filter(function (game) {
            return game.pbfixIsHot;
          }); // 优化
          this.allNode.PopularList.children.forEach(function (item) {
            item.active = false;
          });
          for (var index = 0; index < hotGameList.length; index++) {
            if (index < 8) {
              this.createItemNode(hotGameList[index], this.allNode.PopularList);
            }
          }
        };
        _proto.updateGameList = function updateGameList(name) {
          if (name === void 0) {
            name = "";
          }
          if (name.length < 3) {
            return;
          }
          if (gameDataMgr.gameSearchLog.indexOf(name) < 0) {
            var _data = Utils.deepCopy(gameDataMgr.gameSearchLog);
            _data.unshift(name);
            gameDataMgr.gameSearchLog = _data;
            if (gameDataMgr.gameSearchLog.length > 6) {
              var _data2 = Utils.deepCopy(gameDataMgr.gameSearchLog);
              _data2.pop();
              gameDataMgr.gameSearchLog = _data2;
            }
          }
          var allList = [];
          var gameList = gameDataMgr.gameListData.pbfixGames;
          for (var index = 0; index < gameList.length; index++) {
            var element = gameList[index];
            if (element.pbfixName.toLowerCase().includes(name.toLowerCase())) {
              allList.push(element);
            }
          }
          this.allNode.resultList.children.forEach(function (item) {
            item.active = false;
          });
          this.allNode.topDesc.active = true;
          this.allNode.topDesc2.active = false;
          this.allNode.nodata.active = false;
          if (allList.length == 0) {
            this.allNode.topDesc2.active = true;
            this.allNode.topDesc.active = false;
            this.allNode.nodata.active = true;
            return;
          }
          var data = allList;
          for (var _index = 0; _index < data.length; _index++) {
            this.createItemNode(data[_index], this.allNode.resultList);
          }
        }

        /**
         * 创建item
         * @param itemData 
         * @param parentNode 父节点
         */;
        _proto.createItemNode = function createItemNode(itemData, parentNode) {
          var item = this.getGameBase();
          item.parent = parentNode;
          item.active = true;
          if (!item.getComponent(UIOpacity)) {
            item.addComponent(UIOpacity);
          }
          item.name = itemData.pbfixName;
          NGame.asset.get(itemData.pbfixIcon, ImageAsset, item, {
            remoteOption: {
              ext: ".png"
            },
            completedFunc: function completedFunc(err, imageAsset) {
              if (!err) {
                var spriteFrame = SpriteFrame.createWithImage(imageAsset);
                if (spriteFrame) {
                  item.getComponent(Sprite).spriteFrame = spriteFrame;
                }
              }
            }
          });
          this.onClicked(item, function () {
            // WebGameUtils.openWebGame(this.node, itemData.id)
          });
          UIController.popUp(item, 0.2, 0.3, 1);
        };
        _proto.getGameBase = function getGameBase() {
          for (var index = 0; index < this.gameListNode.length; index++) {
            var element = this.gameListNode[index];
            if (element.active == false) {
              return element;
            }
          }
          var item = instantiate(this.allNode.GameBase);
          this.gameListNode.push(item);
          if (!item.getComponent(UIOpacity)) {
            item.addComponent(UIOpacity);
          }
          return item;
        };
        _proto.closeView = function closeView() {
          // NGame.uiManage.close(GameSearch, { isAll: true }); // 关闭所有的 GameSearch 弹框
          this.closeAndDestroy();
        };
        return GameSearch;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GuideWidDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts', './FreeBonusWithdraw.ts', './SwitchTabData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, EventName, HomeTabIndex, TabEvent, inject, gloEvent, MKViewBase, NGame, gameDataMgr, HttpPbFunc, isResponseValid, pbfixMoneyType, Utils, safetyNum, FreeBonusWithdraw, SwitchTabData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixMoneyType = module.pbfixMoneyType;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      FreeBonusWithdraw = module.FreeBonusWithdraw;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "fff97+kHdVDOKZ2GJJV7Ead", "GuideWidDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GuideWidDialog = exports('GuideWidDialog', (_dec = ccclass('GuideWidDialog'), _dec2 = inject("btnCose", Node), _dec3 = inject("content/btnWithdrawal", Node), _dec4 = inject("content/node_free_balance", Node), _dec5 = inject("content/node_cash_balance", Node), _dec6 = inject("content/node_free_balance/bonus", Node), _dec7 = inject("content/node_cash_balance/cash", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(GuideWidDialog, _MKViewBase);
        function GuideWidDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "btnCose", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnWithdrawal", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "node_free_balance", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "node_cash_balance", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonus", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cash", _descriptor6, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = GuideWidDialog.prototype;
        _proto.open = function open() {
          var _this$initData,
            _this2 = this;
          var openTag = ((_this$initData = this.initData) == null ? void 0 : _this$initData.openTag) || "";
          ("openTag = " + openTag).logI("ujbd7993t71");
          if (openTag && openTag.length > 0) {
            var isCash = openTag == "Cash";
            this.onClicked(this.btnCose, function () {
              _this2.close();
            });
            this.node_cash_balance.active = isCash;
            this.node_free_balance.active = !isCash;
            if (isCash) {
              HttpPbFunc.pbfixWithdrawDataReq(this.node, pbfixMoneyType.pbfixMONEY_TYPE_BALANCE, function (res) {
                var _availableAmount;
                var availableAmount = 0;
                if (isResponseValid(res)) {
                  availableAmount = res.pbfixAvailableAmount || 0;
                }
                _this2.cash.setText(Utils.setCurrency((_availableAmount = availableAmount) == null ? void 0 : _availableAmount.cToRateNum()));
              });
            } else {
              var _gameDataMgr$userInfo;
              this.bonus.setText(Utils.setCurrency(safetyNum((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixBonus).cToRateNum()));
            }
            this.onClicked(this.btnWithdrawal, function () {
              // GoogleAnalytics.track(GAEvent.BONUS_WITHDRAW)
              if (isCash) {
                gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
                  event: TabEvent.DEPOSIT_W
                }));
              } else {
                NGame.uiManage.open(FreeBonusWithdraw);
              }
              _this2.close();
            });
          } else {
            this.close();
          }
        };
        return GuideWidDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCose", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnWithdrawal", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "node_free_balance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "node_cash_balance", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bonus", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cash", [_dec7], {
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

System.register("chunks:///_virtual/hall", ['./BetStatistcisPage.ts', './FundDetailPage.ts', './JackPotBonusNum.ts', './IncomesTab.ts', './InviteFriendsTab.ts', './InviteListTab.ts', './RecordsTab.ts', './RewardsTab.ts', './ShareSearchDataView.ts', './ShareTableView.ts', './AvatarItemNode.ts', './AvatarSelDialog.ts', './UserInfoPage.ts', './BankruptcyAct.ts', './BankruptcyGuide.ts', './CheckinAct.ts', './Turntable.ts', './VipActivity.ts', './VipActivityShop.ts', './VipLvItem.ts', './VipReceiveItem.ts', './VipReceiveManage.ts', './WeeklyCardAct.ts', './WeeklyCardRule.ts', './BindPhoneDialog.ts', './BannerView.ts', './RewardScroller.ts', './InsufficientBalanceDialog.ts', './SelBalanceTypeDialog.ts', './DailyFirstRechargeDialog.ts', './DepositInfo.ts', './DepositTransaction.ts', './FirstDeposit.ts', './FirstDepositInfoHad.ts', './FirstDepositInfoNot.ts', './FirstDepositLittle.ts', './HowToPayDialog.ts', './PayTypeItem.ts', './PayTypePage.ts', './WidFirst.ts', './WidInfo.ts', './EmailPage.ts', './HelpPage.ts', './ActivityJumper.ts', './BaseChildPage.ts', './BaseTabPage.ts', './BonusPage.ts', './CashPoolDialog.ts', './CurrencySwitcher.ts', './DepositPage.ts', './GameBaseItem.ts', './GuideWidDialog.ts', './Hall.ts', './HallCfg.ts', './HallDialogService.ts', './PlayPage.ts', './PromotionPage.ts', './SharePage.ts', './SwitchTabData.ts', './TestChild.ts', './LimitedTimeOffer.ts', './LimitedTimeOfferItem.ts', './GameSearch.ts', './RechargeRolling.ts', './Reddot.ts', './CantWithdrawToRecharge.ts', './FreeBonusWithdraw.ts', './NeedMorePlay.ts', './WidAccountInfo.ts', './WidAccountInfoView.ts', './SidebarPage.ts', './TopMoneyUi.ts', './VipLevelPage.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Hall.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameCfg.ts', './Constant.ts', './BaseEntryView.ts', './Decorators.ts', './MKExport.ts', './NGame.ts', './RegBonusDialog.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './FirebaseMgr.ts', './GoogleAnatytics.ts', './PlatformUtils.ts', './BaseTabPage.ts', './BonusPage.ts', './DepositPage.ts', './HallDialogService.ts', './PlayPage.ts', './PromotionPage.ts', './SharePage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, GameCfg, BundleName, HomeTabIndex, EventName, BaseEntryView, inject, gloEvent, NGame, RegBonusDialog, gameDataMgr, UIController, HttpPbFunc, FirebaseMgr, GoogleAnalytics, GAEvent, PlatformUtils, BaseTabPage, BonusPage, DepositPage, HallDialogService, PlayPage, PromotionPage, SharePage;
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
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      BundleName = module.BundleName;
      HomeTabIndex = module.HomeTabIndex;
      EventName = module.EventName;
    }, function (module) {
      BaseEntryView = module.BaseEntryView;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      RegBonusDialog = module.RegBonusDialog;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      FirebaseMgr = module.FirebaseMgr;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      BonusPage = module.BonusPage;
    }, function (module) {
      DepositPage = module.DepositPage;
    }, function (module) {
      HallDialogService = module.HallDialogService;
    }, function (module) {
      PlayPage = module.PlayPage;
    }, function (module) {
      PromotionPage = module.PromotionPage;
    }, function (module) {
      SharePage = module.SharePage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "1a5d9DUsEhKvoXRzAt/AUAR", "Hall", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Hall = exports('default', (_dec = ccclass('Hall'), _dec2 = inject("node_bottom/layout_btn", Node), _dec3 = inject("node_childPage", Node), _dec4 = inject("btn_service", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseEntryView) {
        _inheritsLoose(Hall, _BaseEntryView);
        function Hall() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseEntryView.call.apply(_BaseEntryView, [this].concat(args)) || this;
          _this.bundleStr = BundleName.HALL;
          // @inject("node_center", Node) // 中间内容区域
          // private pageContainer: Node = null!;
          _initializerDefineProperty(_this, "btnLayout", _descriptor, _assertThisInitialized(_this));
          // 底部按钮layout容器
          _initializerDefineProperty(_this, "node_childPage", _descriptor2, _assertThisInitialized(_this));
          // 二级页面容器
          _initializerDefineProperty(_this, "serviceBtn", _descriptor3, _assertThisInitialized(_this));
          _this.switchPageing = false;
          // 页面配置
          _this.pageList = [{
            index: HomeTabIndex.Deposit,
            page: DepositPage
          }, {
            index: HomeTabIndex.Promotion,
            page: PromotionPage
          }, {
            index: HomeTabIndex.Play,
            page: PlayPage
          }, {
            index: HomeTabIndex.Share,
            page: SharePage
          }, {
            index: HomeTabIndex.Bonus,
            page: BonusPage
          }];
          _this.defaultPageIndex = 2;
          // 默认显示的页面
          _this.curPageIndex = -1;
          return _this;
        }
        var _proto = Hall.prototype;
        _proto.create = function create() {};
        _proto.onEnable = function onEnable() {};
        _proto.onLoad = function onLoad() {
          UIController.playHallBgm();
        };
        _proto.open = function open() {
          FirebaseMgr.reportPageEvent(FirebaseMgr.pageEventName.HALL);
          this.addClickEvent();
          this.initUI();
          this.initEvent();
          this.startRefreshTokenSchedule();
        };
        _proto.initEvent = function initEvent() {
          var _this2 = this;
          // 打开了二级页面
          // this.onMsg(EventName.OPEN_CHILD, (key: any) => {
          //     this.setCurTabPageDisplay(false)
          // })

          // 关闭了某个二级页面
          // this.node_childPage.on(Node.EventType.CHILD_REMOVED, () => {
          //     if (this.node_childPage.children.length <= 0 && this.curPageIndex != -1) {
          //         this.setCurTabPageDisplay()
          //     }
          // }, this);

          this.onMsg(EventName.SWITCH_TAB, function (tabData) {
            _this2.switchPage(tabData.tabIndex, tabData.action);
          });
        };
        _proto.setCurTabPageDisplay = function setCurTabPageDisplay(display) {
          if (display === void 0) {
            display = true;
          }
          if (this.curPageIndex != -1) {
            var page = NGame.uiManage.get(this.pageList[this.curPageIndex].page);
            if (page) {
              page.node.active = display;
            }
          }
        };
        _proto.addClickEvent = function addClickEvent() {
          // 底部switch按钮切换页面
          var childrens = this.btnLayout.children;
          for (var btnIndex = 0; btnIndex < childrens.length; btnIndex++) {
            var btnNode = childrens[btnIndex];
            this.onClicked(btnNode, this.switchPage.bind(this, btnIndex));
          }
          // this.onClicked(this.userInfoBtn, this.switchPage.bind(this, HomeTabIndex.UserInfo)) // 用户信息按钮
          this.onClicked(this.serviceBtn, function () {
            PlatformUtils.showLiveChat();
          }, false, 1.0, false);
        };
        _proto.initUI = /*#__PURE__*/function () {
          var _initUI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _gameDataMgr$userInfo;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!gameDataMgr.isGoStraightToHall) {
                    _context.next = 3;
                    break;
                  }
                  this.switchPage(this.defaultPageIndex);
                  return _context.abrupt("return");
                case 3:
                  // const checkDailyFirstRecharge = () => {
                  //     // 自动弹框
                  //     if (gameDataMgr.userInfo?.pbfixIsRegRewardReceived && PayUtils.isDailyFirstPayActVail) {
                  //         if (!GameCfg.isDebug) { // 调试阶段不弹框
                  //             NGame.uiManage.open(DailyFirstRechargeDialog)
                  //         }
                  //     }
                  // }

                  if (!((_gameDataMgr$userInfo = gameDataMgr.userInfo) != null && _gameDataMgr$userInfo.pbfixIsRegRewardReceived)) {
                    gameDataMgr.gameBaseData.regBonusDialogTag = true;
                    NGame.uiManage.open(RegBonusDialog, {
                      init: {
                        onActClose: function onActClose() {
                          // NGame.uiManage.open(FirstDepositLittle)  
                          gameDataMgr.gameBaseData.isFirstDepositLittleShowed = true;
                          HallDialogService.getInstance().initDialogConf(true);
                        }
                      }
                    });
                  }
                  this.switchPage(this.defaultPageIndex);
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function initUI() {
            return _initUI.apply(this, arguments);
          }
          return initUI;
        }() // private initBaseUI() {
        //     this.topMoneyUi.getComponent(UITransform).height = this.node.contentSize().height - this.node_top.contentSize().height
        // }
        /**
         * 点击底部按钮切换页面
         * @param index 
         * @returns 
         */;

        _proto.switchPage = /*#__PURE__*/
        function () {
          var _switchPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(index, acton) {
            var _this3 = this;
            var forbidOpenIndex;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(this.switchPageing || this.curPageIndex == index)) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  this.switchPageing = true;
                  if (!gameDataMgr.isGoStraightToHall) {
                    _context3.next = 9;
                    break;
                  }
                  // 临时用户不能进入充值页面、推广页面
                  forbidOpenIndex = [0, 3];
                  if (!forbidOpenIndex.includes(index)) {
                    _context3.next = 9;
                    break;
                  }
                  GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
                  gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
                  return _context3.abrupt("return");
                case 9:
                  this.pageList.forEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(p, tabIndex) {
                    var _page;
                    var page, _page$getComponent;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          page = NGame.uiManage.get(p.page);
                          if (!page) {
                            _context2.next = 5;
                            break;
                          }
                          page.node.active = tabIndex == index;
                          _context2.next = 9;
                          break;
                        case 5:
                          if (!(tabIndex == index)) {
                            _context2.next = 9;
                            break;
                          }
                          _context2.next = 8;
                          return NGame.uiManage.openHomeTab(_this3.pageList[index].page);
                        case 8:
                          page = _context2.sent;
                        case 9:
                          if (acton && ((_page = page) == null || (_page = _page.node) == null ? void 0 : _page.active) === true) {
                            (_page$getComponent = page.getComponent(BaseTabPage)) == null || _page$getComponent.onAction(acton);
                          }
                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  })));
                  this.curPageIndex = index;
                  this.updateSwitchBtnState(index);
                  this.closeAllChildPage();
                  this.switchPageing = false;
                case 14:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function switchPage(_x, _x2) {
            return _switchPage.apply(this, arguments);
          }
          return switchPage;
        }() /**关闭所有二级页面 */;
        _proto.closeAllChildPage = function closeAllChildPage() {
          for (var i = this.node_childPage.children.length - 1; i >= 0; i--) {
            NGame.uiManage.close(this.node_childPage.children[i]);
          }
        }

        /**
         * 更新底部按钮状态
         */;
        _proto.updateSwitchBtnState = function updateSwitchBtnState(index) {
          var childrens = this.btnLayout.children;
          for (var btnIndex = 0; btnIndex < childrens.length; btnIndex++) {
            var btnNode = childrens[btnIndex];
            var unselNode = btnNode.getChildByName("node_unsel");
            var selNode = btnNode.getChildByName("node_sel");
            var selTagNode = btnNode.getChildByName("tag_sel");
            selNode.active = btnIndex == index;
            selTagNode.active = btnIndex == index;
            unselNode.active = btnIndex !== index;
          }
        }

        /**
         * 启动token续期调度 
         */;
        _proto.startRefreshTokenSchedule = function startRefreshTokenSchedule() {
          this.schedule(this.refreshTokenReq.bind(this), GameCfg.TOKEN_REFRESH_INTERVAL);
        };
        _proto.refreshTokenReq = function refreshTokenReq() {
          HttpPbFunc.pbfixRefreshTokenReq();
        };
        _proto.onDestroy = function onDestroy() {
          var _this$node_childPage;
          (_this$node_childPage = this.node_childPage) == null || _this$node_childPage.targetOff(this);

          // 取消token续期调度
          this.unschedule(this.refreshTokenReq.bind(this));
        };
        return Hall;
      }(BaseEntryView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnLayout", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "node_childPage", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "serviceBtn", [_dec4], {
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

System.register("chunks:///_virtual/HallCfg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './BundleCfg.ts', './Decorators.ts', './MKUIManage.ts', './NGame.ts', './RegBonusDialog.ts', './PageSkLoading.ts', './BankruptcyAct.ts', './BankruptcyGuide.ts', './CheckinAct.ts', './Turntable.ts', './VipActivity.ts', './WeeklyCardAct.ts', './WeeklyCardRule.ts', './BetStatistcisPage.ts', './BindPhoneDialog.ts', './DailyFirstRechargeDialog.ts', './FirstDeposit.ts', './FirstDepositLittle.ts', './HowToPayDialog.ts', './PayTypePage.ts', './EmailPage.ts', './FundDetailPage.ts', './HelpPage.ts', './LimitedTimeOffer.ts', './CantWithdrawToRecharge.ts', './FreeBonusWithdraw.ts', './NeedMorePlay.ts', './IncomesTab.ts', './InviteFriendsTab.ts', './InviteListTab.ts', './RecordsTab.ts', './RewardsTab.ts', './UserInfoPage.ts', './VipLevelPage.ts', './BonusPage.ts', './CashPoolDialog.ts', './DepositPage.ts', './PlayPage.ts', './PromotionPage.ts', './SharePage.ts', './TestChild.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BundleName, BundleCfg, registBundleCfg, MKUIManage_, NGame, RegBonusDialog, PageSkLoading, BankruptcyAct, BankruptcyGuide, CheckinAct, Turntable, VipActivity, WeeklyCardAct, WeeklyCardRule, BetStatistcisPage, BindPhoneDialog, DailyFirstRechargeDialog, FirstDeposit, FirstDepositLittle, HowToPayDialog, PayTypePage, EmailPage, FundDetailPage, HelpPage, LimitedTimeOffer, CantWithdrawToRecharge, FreeBonusWithdraw, NeedMorePlay, IncomesTab, InviteFriendsTab, InviteListTab, RecordsTab, RewardsTab, UserInfoPage, VipLevelPage, BonusPage, CashPoolDialog, DepositPage, PlayPage, PromotionPage, SharePage, TestChild;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BundleName = module.BundleName;
    }, function (module) {
      BundleCfg = module.BundleCfg;
    }, function (module) {
      registBundleCfg = module.registBundleCfg;
    }, function (module) {
      MKUIManage_ = module.MKUIManage_;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      RegBonusDialog = module.RegBonusDialog;
    }, function (module) {
      PageSkLoading = module.PageSkLoading;
    }, function (module) {
      BankruptcyAct = module.BankruptcyAct;
    }, function (module) {
      BankruptcyGuide = module.BankruptcyGuide;
    }, function (module) {
      CheckinAct = module.CheckinAct;
    }, function (module) {
      Turntable = module.Turntable;
    }, function (module) {
      VipActivity = module.VipActivity;
    }, function (module) {
      WeeklyCardAct = module.WeeklyCardAct;
    }, function (module) {
      WeeklyCardRule = module.WeeklyCardRule;
    }, function (module) {
      BetStatistcisPage = module.BetStatistcisPage;
    }, function (module) {
      BindPhoneDialog = module.BindPhoneDialog;
    }, function (module) {
      DailyFirstRechargeDialog = module.DailyFirstRechargeDialog;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      FirstDepositLittle = module.FirstDepositLittle;
    }, function (module) {
      HowToPayDialog = module.HowToPayDialog;
    }, function (module) {
      PayTypePage = module.default;
    }, function (module) {
      EmailPage = module.EmailPage;
    }, function (module) {
      FundDetailPage = module.FundDetailPage;
    }, function (module) {
      HelpPage = module.HelpPage;
    }, function (module) {
      LimitedTimeOffer = module.LimitedTimeOffer;
    }, function (module) {
      CantWithdrawToRecharge = module.CantWithdrawToRecharge;
    }, function (module) {
      FreeBonusWithdraw = module.FreeBonusWithdraw;
    }, function (module) {
      NeedMorePlay = module.NeedMorePlay;
    }, function (module) {
      IncomesTab = module.IncomesTab;
    }, function (module) {
      InviteFriendsTab = module.InviteFriendsTab;
    }, function (module) {
      InviteListTab = module.InviteListTab;
    }, function (module) {
      RecordsTab = module.RecordsTab;
    }, function (module) {
      RewardsTab = module.RewardsTab;
    }, function (module) {
      UserInfoPage = module.UserInfoPage;
    }, function (module) {
      VipLevelPage = module.VipLevelPage;
    }, function (module) {
      BonusPage = module.BonusPage;
    }, function (module) {
      CashPoolDialog = module.CashPoolDialog;
    }, function (module) {
      DepositPage = module.DepositPage;
    }, function (module) {
      PlayPage = module.PlayPage;
    }, function (module) {
      PromotionPage = module.PromotionPage;
    }, function (module) {
      SharePage = module.SharePage;
    }, function (module) {
      TestChild = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fcd2a4hwt1Fh5LupiOyt+zb", "HallCfg", undefined);
      var HallCfg = exports('HallCfg', (_dec = registBundleCfg(BundleName.HALL), _dec(_class = /*#__PURE__*/function (_BundleCfg) {
        _inheritsLoose(HallCfg, _BundleCfg);
        function HallCfg() {
          return _BundleCfg.apply(this, arguments) || this;
        }
        var _proto = HallCfg.prototype;
        _proto.regisUI = function regisUI() {
          // `HALL regisUI `.logI(`dshuf28276346`);
          var entryNode = NGame.uiManage.getEntyrNode(BundleName.HALL);

          // 主Tab页面
          var pageContainer = entryNode.child("node_center");
          // const pageContainer = MainBundle;
          // NGame.uiManage.regis(DepositPage, `db://assets/hall/home/prefab/page_deposit.prefab`, pageContainer)
          // NGame.uiManage.regis(PromotionPage, `db://assets/hall/home/prefab/page_promotion.prefab`, pageContainer)
          // NGame.uiManage.regis(PlayPage, `db://assets/hall/home/prefab/page_play.prefab`, pageContainer)
          // NGame.uiManage.regis(SharePage, `db://assets/hall/home/prefab/page_share.prefab`, pageContainer)
          // NGame.uiManage.regis(BonusPage, `db://assets/hall/home/prefab/page_bonus.prefab`, pageContainer)
          // NGame.uiManage.regis(UserInfoPage, `db://assets/hall/UserInfo/prefab/UserInfoPage.prefab`, pageContainer)

          // 全屏页面
          // NGame.uiManage.regis(UserInfoPage, `db://assets/hall/UserInfo/prefab/UserInfoPage.prefab`, pageContainer)
          // NGame.uiManage.regis(RegBonusDialog, `db://assets/hall/home/prefab/RegBonusDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(Turntable, `db://assets/hall/activity/Turntable777/prefab/Turntable777.prefab`, pageContainer)
          // NGame.uiManage.regis(VipActivity, `db://assets/hall/activity/vip/prefab/VipActivity.prefab`, pageContainer)
          // NGame.uiManage.regis(CheckinAct, `db://assets/hall/activity/Checkin/prefab/CheckinAct.prefab`, pageContainer)
          // NGame.uiManage.regis(WeeklyCardAct, `db://assets/hall/activity/weeklyCard/prefab/WeeklyCardAct.prefab`, pageContainer)
          // NGame.uiManage.regis(WeeklyCardRule, `db://assets/hall/activity/weeklyCard/prefab/WeeklyCardRule.prefab`, pageContainer)
          // NGame.uiManage.regis(BankruptcyAct, `db://assets/hall/activity/bankruptcy/prefab/BankruptcyAct.prefab`, pageContainer)
          // NGame.uiManage.regis(FirstDepositLittle, `db://assets/hall/deposit/prefab/FirstDepositLittle.prefab`, pageContainer)
          // NGame.uiManage.regis(DailyFirstRechargeDialog, `db://assets/hall/deposit/prefab/DailyFirstRechargeDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(FreeBonusWithdraw, `db://assets/hall/releaseBack/prefab/FreeBonusWithdraw.prefab`, pageContainer)
          // NGame.uiManage.regis(NeedMorePlay, `db://assets/hall/releaseBack/prefab/NeedMorePlay.prefab`, pageContainer)
          // NGame.uiManage.regis(CantWithdrawToRecharge, `db://assets/hall/releaseBack/prefab/CantWithdrawToRecharge.prefab`, pageContainer)
          // NGame.uiManage.regis(PayTypePage, `db://assets/hall/deposit/prefab/PayTypePage.prefab`, pageContainer)
          // NGame.uiManage.regis(CashPoolDialog, `db://assets/hall/home/prefab/CashPoolDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(SettingsDialog, `db://assets/hall/settings/prefab/SettingsDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(FundDetailPage, `db://assets/hall/FundDetail/prefab/FundDetailPage.prefab`, pageContainer)
          // NGame.uiManage.regis(BetStatistcisPage, `db://assets/hall/BetStatistcis/prefab/BetStatistcisPage.prefab`, pageContainer)
          // NGame.uiManage.regis(HelpPage, `db://assets/hall/help/prefab/HelpPage.prefab`, pageContainer)
          // NGame.uiManage.regis(VipLevelPage, `db://assets/hall/vip/prefab/VipLevelPage.prefab`, pageContainer)
          // NGame.uiManage.regis(LimitedTimeOffer, `db://assets/hall/limitedTimeOffer/prefab/LimitedTimeOffer.prefab`, pageContainer)

          // 二级页面
          // const nodeChildPage = entryNode.child(`node_childPage`);
          // const nodeChildPage = MainBundle;
          // NGame.uiManage.regis(FirstDeposit, `db://assets/hall/deposit/prefab/FirstDeposit.prefab`, pageContainer)
          // NGame.uiManage.regis(TestChild, `db://assets/hall/home/prefab/TestChild.prefab`, pageContainer, {isRepeat: true})
          // NGame.uiManage.regis(EmailPage, `db://assets/hall/email/prefab/EmailPage.prefab`, pageContainer)
          // NGame.uiManage.regis(BindPhoneDialog, `db://assets/hall/bindphone/prefab/BindPhoneDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(HowToPayDialog, `db://assets/hall/deposit/prefab/HowToPayDialog.prefab`, pageContainer)
          // NGame.uiManage.regis(BankruptcyGuide, `db://assets/hall/activity/bankruptcy/prefab/BankruptcyGuide.prefab`, pageContainer)

          // 分享页面Tab
          // NGame.uiManage.regis(InviteFriendsTab, `db://assets/hall/Share/prefab/InviteFriendsTab.prefab`, pageContainer)
          // NGame.uiManage.regis(RewardsTab, `db://assets/hall/Share/prefab/RewardsTab.prefab`, pageContainer)
          // NGame.uiManage.regis(IncomesTab, `db://assets/hall/Share/prefab/IncomesTab.prefab`, pageContainer)
          // NGame.uiManage.regis(RecordsTab, `db://assets/hall/Share/prefab/RecordsTab.prefab`, pageContainer)
          // NGame.uiManage.regis(InviteListTab, `db://assets/hall/Share/prefab/InviteListTab.prefab`, pageContainer)

          // NGame.uiManage.regis(PageSkLoading, `db://assets/resources/prefab/PageSkLoading-001.prefab`, pageContainer)

          // NGame.uiManage.getRegisDataFunc = this.getRegisDataFunc
          NGame.uiManage.getRegisDataFunc = function (page) {
            var registData = new MKUIManage_.RegisData();
            registData.target = pageContainer;

            // 首页Tab
            if (page === PromotionPage) {
              registData.source = "db://assets/hall/home/prefab/page_promotion.prefab";
            }
            if (page === SharePage) {
              registData.source = "db://assets/hall/home/prefab/page_share.prefab";
            }
            if (page === BonusPage) {
              registData.source = "db://assets/hall/home/prefab/page_bonus.prefab";
            }

            // 分享模块Tab
            if (page === InviteFriendsTab) {
              registData.source = "db://assets/hall/Share/prefab/InviteFriendsTab.prefab";
            }
            if (page === RewardsTab) {
              registData.source = "db://assets/hall/Share/prefab/RewardsTab.prefab";
            }
            if (page === IncomesTab) {
              registData.source = "db://assets/hall/Share/prefab/IncomesTab.prefab";
            }
            if (page === RecordsTab) {
              registData.source = "db://assets/hall/Share/prefab/RecordsTab.prefab";
            }
            if (page === InviteListTab) {
              registData.source = "db://assets/hall/Share/prefab/InviteListTab.prefab";
            }

            // 其他
            if (page === RegBonusDialog) {
              registData.source = "db://assets/resources/prefab/RegBonusDialog.prefab";
            }
            if (page === FirstDepositLittle) {
              registData.source = "db://assets/hall/deposit/prefab/FirstDepositLittle.prefab";
            }
            if (page === DailyFirstRechargeDialog) {
              registData.source = "db://assets/hall/deposit/prefab/DailyFirstRechargeDialog.prefab";
            }
            if (page === FreeBonusWithdraw) {
              registData.source = "db://assets/hall/releaseBack/prefab/FreeBonusWithdraw.prefab";
            }
            if (page === NeedMorePlay) {
              registData.source = "db://assets/hall/releaseBack/prefab/NeedMorePlay.prefab";
            }
            if (page === CantWithdrawToRecharge) {
              registData.source = "db://assets/hall/releaseBack/prefab/CantWithdrawToRecharge.prefab";
            }
            if (page === PayTypePage) {
              registData.source = "db://assets/hall/deposit/prefab/PayTypePage.prefab";
            }
            if (page === FirstDeposit) {
              registData.source = "db://assets/hall/deposit/prefab/FirstDeposit.prefab";
            }
            if (page === EmailPage) {
              registData.source = "db://assets/hall/email/prefab/EmailPage.prefab";
            }
            if (page === BankruptcyGuide) {
              registData.source = "db://assets/hall/activity/bankruptcy/prefab/BankruptcyGuide.prefab";
            }
            if (page === Turntable) {
              registData.source = "db://assets/hall/activity/Turntable777/prefab/Turntable777.prefab";
            }
            if (page === PageSkLoading) {
              registData.source = "db://assets/resources/prefab/PageSkLoading-002.prefab";
            }
            return registData;
            // return {
            //     registData: registData
            //     // 这里放 RegisData 的字段
            //     // 再放可选的 RegisConfig 字段
            //   } as any;
          };
        };

        _proto.unRegisUI = function unRegisUI() {
          // `HALL unRegisUI `.logI(`dshuf28276346`);
          NGame.uiManage.unregis(TestChild);
          NGame.uiManage.unregis(DepositPage);
          NGame.uiManage.unregis(PromotionPage);
          NGame.uiManage.unregis(PlayPage);
          NGame.uiManage.unregis(SharePage);
          NGame.uiManage.unregis(BonusPage);
          NGame.uiManage.unregis(FirstDeposit);
          NGame.uiManage.unregis(RegBonusDialog);
          NGame.uiManage.unregis(Turntable);
          NGame.uiManage.unregis(UserInfoPage);
          NGame.uiManage.unregis(VipLevelPage);
          NGame.uiManage.unregis(LimitedTimeOffer);
          NGame.uiManage.unregis(BetStatistcisPage);
          NGame.uiManage.unregis(FundDetailPage);
          NGame.uiManage.unregis(EmailPage);
          NGame.uiManage.unregis(BindPhoneDialog);
          NGame.uiManage.unregis(HelpPage);
          NGame.uiManage.unregis(VipActivity);
          NGame.uiManage.unregis(CheckinAct);
          NGame.uiManage.unregis(WeeklyCardAct);
          NGame.uiManage.unregis(WeeklyCardRule);
          NGame.uiManage.unregis(BankruptcyAct);
          NGame.uiManage.unregis(FirstDepositLittle);
          NGame.uiManage.unregis(DailyFirstRechargeDialog);
          NGame.uiManage.unregis(FreeBonusWithdraw);
          NGame.uiManage.unregis(NeedMorePlay);
          NGame.uiManage.unregis(CantWithdrawToRecharge);
          NGame.uiManage.unregis(PayTypePage);
          NGame.uiManage.unregis(CashPoolDialog);
          NGame.uiManage.unregis(InviteFriendsTab);
          NGame.uiManage.unregis(RewardsTab);
          NGame.uiManage.unregis(IncomesTab);
          NGame.uiManage.unregis(RecordsTab);
          NGame.uiManage.unregis(InviteListTab);
          NGame.uiManage.unregis(HowToPayDialog);
          NGame.uiManage.unregis(BankruptcyGuide);
        };
        _proto.initBundleData = function initBundleData() {};
        return HallCfg;
      }(BundleCfg)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HallDialogService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './UIHelper.ts', './MKExport.ts', './NGame.ts', './GameDataMgr.ts', './PageSkLoading.ts', './PwaGuideDialog.ts', './PwaInstallHelper.ts', './PayUtils.ts', './Utils.ts', './CheckinAct.ts', './Turntable.ts', './DailyFirstRechargeDialog.ts', './FirstDepositLittle.ts', './GuideWidDialog.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, isValid, director, view, Node, UITransform, Vec3, BlockInputEvents, PageSkType, RedDotType, StorageKey, EventName, UIHelper, UIPath, gloEvent, NGame, gameDataMgr, PageSkLoading, PwaGuideDialog, PwaInstallHelper, PayUtils, safetyNum, Utils, CheckinAct, Turntable, DailyFirstRechargeDialog, FirstDepositLittle, GuideWidDialog;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      isValid = module.isValid;
      director = module.director;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      BlockInputEvents = module.BlockInputEvents;
    }, function (module) {
      PageSkType = module.PageSkType;
      RedDotType = module.RedDotType;
      StorageKey = module.StorageKey;
      EventName = module.EventName;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      PageSkLoading = module.PageSkLoading;
    }, function (module) {
      PwaGuideDialog = module.PwaGuideDialog;
    }, function (module) {
      PwaInstallHelper = module.PwaInstallHelper;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      CheckinAct = module.CheckinAct;
    }, function (module) {
      Turntable = module.Turntable;
    }, function (module) {
      DailyFirstRechargeDialog = module.DailyFirstRechargeDialog;
    }, function (module) {
      FirstDepositLittle = module.FirstDepositLittle;
    }, function (module) {
      GuideWidDialog = module.GuideWidDialog;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b23d1tYLmdA2JjcDSQndDI9", "HallDialogService", undefined);
      var SHOW_COUNT_DAY = 10; // 每日最多展示次数
      var SHOW_COUNT_LOGIN = 2; // 每次登录最多弹框次数

      /**
       * 大厅自动弹框逻辑
       */
      var HallDialogService = exports('HallDialogService', /*#__PURE__*/function () {
        HallDialogService.getInstance = function getInstance() {
          if (!this.instance) {
            this.instance = new HallDialogService();
          }
          return this.instance;
        };
        function HallDialogService() {
          this.popConf = [];
          this.touchMaskNode = null;
          // 触摸遮罩节点，弹框期间不允许点击大厅其他按钮
          // 1. 定义一个变量来保存引用
          this.myTween = null;
          gloEvent.on(EventName.REMOVE_DIALOG_TOUCH_MASK, this.onDialogShow, this);
        }

        /**
         * 弹框已展示完成，需要移除触摸屏蔽层
         * @param eventName 
         * @param data 
         */
        var _proto = HallDialogService.prototype;
        _proto.onDialogShow = function onDialogShow(eventName, data) {
          this.clearTouchMaskSchedule();
        };
        _proto.getDialogConf = function getDialogConf() {
          return this.popConf || [];
        }

        /**
         * 进入到大厅并且获得大厅数据的时候调用
         */;
        _proto.initDialogConf = /*#__PURE__*/
        function () {
          var _initDialogConf = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(isNewPlayer) {
            var _gameDataMgr$userInfo, _gameDataMgr$userInfo2;
            var lastLoginTime, isTodayFirstLogin, conf;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (isNewPlayer === void 0) {
                    isNewPlayer = false;
                  }
                  // if (GameCfg.IS_HIDE_DIALOG) { // 测试阶段使用
                  //     return
                  // }
                  lastLoginTime = NGame.storage.getNumber((((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixUid) || "") + "_last_login_time") || 0;
                  isTodayFirstLogin = !Utils.isSameDay(lastLoginTime);
                  NGame.storage.set((((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixUid) || "") + "_last_login_time", new Date().getTime());
                  if (!this.isOverShowCount(isTodayFirstLogin)) {
                    _context.next = 6;
                    break;
                  }
                  return _context.abrupt("return");
                case 6:
                  conf = []; // if (isTodayFirstLogin) { //今天首充登录
                  // conf = isNewPlayer ? this.initNewPlayerDayFirstLoginConf() : this.initOtherPlayerDayFirstLoginConf();
                  // conf = this.initOtherPlayerDayFirstLoginConf()
                  // } else {
                  // conf = this.initPlayerDayNormalLoginConf();
                  // conf = await this.initPlayerDayNormalLoginConfBySort();
                  // }
                  if (!isNewPlayer) {
                    _context.next = 11;
                    break;
                  }
                  conf = this.initOtherPlayerDayFirstLoginConf();
                  _context.next = 14;
                  break;
                case 11:
                  _context.next = 13;
                  return this.initPlayerDayNormalLoginConfBySort();
                case 13:
                  conf = _context.sent;
                case 14:
                  this.popConf = conf;
                  this.toShowDialogList();
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function initDialogConf(_x) {
            return _initDialogConf.apply(this, arguments);
          }
          return initDialogConf;
        }()
        /**
         * 是否超过每日最大展示次数
         * @returns 
         */;

        _proto.isOverShowCount = function isOverShowCount(isTodayFirstLogin) {
          var flag = false;
          var showCount = 0; // 今日已经展示的次数，默认每日首次登录，次数重置
          if (!isTodayFirstLogin) {
            var _gameDataMgr$userInfo3;
            showCount = NGame.storage.getNumber((((_gameDataMgr$userInfo3 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo3.pbfixUid) || "") + "_show_dialog_count", 0);
          }
          if (showCount >= SHOW_COUNT_DAY) {
            flag = true;
          } else {
            var _gameDataMgr$userInfo4;
            showCount++;
            NGame.storage.set((((_gameDataMgr$userInfo4 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo4.pbfixUid) || "") + "_show_dialog_count", showCount);
          }
          return flag;
        };
        _proto.toShowDialogList = function toShowDialogList() {
          if (!this.popConf || this.popConf.length === 0) return;
          this.showTouchMask();
          this.openPopViewList(0);
        };
        _proto.openPopViewList = /*#__PURE__*/function () {
          var _openPopViewList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(index) {
            var _this = this;
            var id, nextCallBack, dialogParams;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  id = this.popConf[index];
                  if (!(id === undefined)) {
                    _context2.next = 5;
                    break;
                  }
                  this.popConf = [];
                  // console.log("no more dialog");
                  this.removeTouchMask();
                  return _context2.abrupt("return");
                case 5:
                  // 场景判断：当前当前页面场景是否需要展示弹框
                  nextCallBack = function nextCallBack() {
                    _this.showTouchMask();
                    // 随便传入一个对象，甚至可以是空对象 {}
                    tween(_this).delay(0.5) // 单位是秒
                    .call(function () {
                      _this.openPopViewList(index + 1);
                    }).start();
                  };
                  dialogParams = {
                    init: {
                      onActClose: function onActClose() {
                        nextCallBack();
                      }
                    }
                  };
                  _context2.t0 = id;
                  _context2.next = _context2.t0 === PageSkType.DIALOG_TYPE_DAILY_SIGN ? 10 : _context2.t0 === PageSkType.DIALOG_TYPE_FIRST_TOP_UP ? 16 : _context2.t0 === PageSkType.DIALOG_TYPE_WHEEL_ACTIVITY ? 22 : _context2.t0 === PageSkType.DIALOG_TYPE_DAILY_FIRST_DEPOSIT ? 28 : _context2.t0 === PageSkType.DIALOG_TYPE_PWA_GUIDE ? 34 : 40;
                  break;
                case 10:
                  if (NGame.uiManage.isCache(CheckinAct)) {
                    _context2.next = 13;
                    break;
                  }
                  _context2.next = 13;
                  return NGame.uiManage.open(PageSkLoading, {
                    init: {
                      pageTag: UIPath.CheckinAct
                    }
                  });
                case 13:
                  _context2.next = 15;
                  return UIHelper.openUI(CheckinAct, UIPath.CheckinAct, undefined, dialogParams);
                case 15:
                  return _context2.abrupt("break", 43);
                case 16:
                  if (NGame.uiManage.isCache(FirstDepositLittle)) {
                    _context2.next = 19;
                    break;
                  }
                  _context2.next = 19;
                  return NGame.uiManage.open(PageSkLoading, {
                    init: {
                      pageTag: UIPath.FirstDepositLittle
                    }
                  });
                case 19:
                  _context2.next = 21;
                  return UIHelper.openUI(FirstDepositLittle, UIPath.FirstDepositLittle, undefined, dialogParams);
                case 21:
                  return _context2.abrupt("break", 43);
                case 22:
                  if (NGame.uiManage.isCache(Turntable)) {
                    _context2.next = 25;
                    break;
                  }
                  _context2.next = 25;
                  return NGame.uiManage.open(PageSkLoading, {
                    init: {
                      pageTag: UIPath.Turntable
                    }
                  });
                case 25:
                  _context2.next = 27;
                  return UIHelper.openUI(Turntable, UIPath.Turntable, undefined, dialogParams);
                case 27:
                  return _context2.abrupt("break", 43);
                case 28:
                  if (NGame.uiManage.isCache(DailyFirstRechargeDialog)) {
                    _context2.next = 31;
                    break;
                  }
                  _context2.next = 31;
                  return NGame.uiManage.open(PageSkLoading, {
                    init: {
                      pageTag: UIPath.DailyFirstRechargeDialog
                    }
                  });
                case 31:
                  _context2.next = 33;
                  return UIHelper.openUI(DailyFirstRechargeDialog, UIPath.DailyFirstRechargeDialog, undefined, dialogParams);
                case 33:
                  return _context2.abrupt("break", 43);
                case 34:
                  if (NGame.uiManage.isCache(PwaGuideDialog)) {
                    _context2.next = 37;
                    break;
                  }
                  _context2.next = 37;
                  return NGame.uiManage.open(PageSkLoading, {
                    init: {
                      pageTag: UIPath.PwaGuideDialog
                    }
                  });
                case 37:
                  _context2.next = 39;
                  return UIHelper.openUI(PwaGuideDialog, UIPath.PwaGuideDialog, undefined, dialogParams);
                case 39:
                  return _context2.abrupt("break", 43);
                case 40:
                  console.log("invalid dialog id:", id);
                  this.openPopViewList(index + 1);
                  return _context2.abrupt("break", 43);
                case 43:
                  NGame.uiManage.close(PageSkLoading);
                case 44:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function openPopViewList(_x2) {
            return _openPopViewList.apply(this, arguments);
          }
          return openPopViewList;
        }()
        /**
         * 新用户首次登录弹框逻辑
         * @returns 
         */
        // private initNewPlayerDayFirstLoginConf(): number[] {
        //     this.newPlayerDayFirstLoginConf = [];
        //     if (this.isNeedShowCheckIn()) {
        //         this.newPlayerDayFirstLoginConf.push(DialogType.DIALOG_TYPE_DAILY_SIGN);
        //     }
        //     return this.newPlayerDayFirstLoginConf;
        // }
        /**
         * 每日首次登录弹框逻辑 | 新用户登录
         * @returns 
         */;

        _proto.initOtherPlayerDayFirstLoginConf = function initOtherPlayerDayFirstLoginConf() {
          var conf = [];
          if (this.isNeedShowWheelActivity()) {
            conf.push(PageSkType.DIALOG_TYPE_WHEEL_ACTIVITY);
          }
          if (this.isNeedShowCheckIn()) {
            conf.push(PageSkType.DIALOG_TYPE_DAILY_SIGN);
          }
          return conf;
        }

        /**
         * 每日非首次登录弹框
         * @returns 
         */
        // private initPlayerDayNormalLoginConf(): number[] {
        //     let conf = [];

        //     // 剩余转盘次数
        //     if (this.isNeedShowWheelActivity()) {
        //         conf.push(DialogType.DIALOG_TYPE_WHEEL_ACTIVITY);
        //     }

        //     if (this.isNeedShowCheckIn()) {
        //         conf.push(DialogType.DIALOG_TYPE_DAILY_SIGN);
        //     }

        //     // 首充弹框
        //     if (this.isNeedShowFirstRecharge()) {
        //         conf.push(DialogType.DIALOG_TYPE_FIRST_TOP_UP);
        //     }

        //     // 每日首充充值
        //     if (this.isNeedShowDailyFirstRecharge()) {
        //         conf.push(DialogType.DIALOG_TYPE_DAILY_FIRST_DEPOSIT);
        //     }

        //     return conf;
        // }

        /**
         * 每日非首次登录弹框
         */;
        _proto.initPlayerDayNormalLoginConfBySort = /*#__PURE__*/
        function () {
          var _initPlayerDayNormalLoginConfBySort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var conf, needShowPwaGuide, needPushCount, addPwaGuideFunc, needShowWheel, needShowFirstRecharge;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  conf = [];
                  needShowPwaGuide = false; // 260509 改成不主动弹pwa引导弹框
                  // let needShowPwaGuide = await PwaInstallHelper.needShowInstallBanner();
                  if (!gameDataMgr.needAutoShowPwaGuideDialog) {
                    _context3.next = 6;
                    break;
                  }
                  _context3.next = 5;
                  return PwaInstallHelper.needShowInstallBanner();
                case 5:
                  needShowPwaGuide = _context3.sent;
                case 6:
                  needPushCount = SHOW_COUNT_LOGIN; // 需要从sortConf添加的总数量（不包括pwa，pwa直接追加到needShowConf尾部）
                  if (needShowPwaGuide) {
                    needPushCount--; // 需要将pwa弹框
                  }

                  addPwaGuideFunc = function addPwaGuideFunc() {
                    if (needShowPwaGuide) {
                      conf.push(PageSkType.DIALOG_TYPE_PWA_GUIDE);
                    }
                  }; // 剩余转盘次数
                  needShowWheel = this.isNeedShowWheelActivity();
                  if (needShowWheel) {
                    conf.push(PageSkType.DIALOG_TYPE_WHEEL_ACTIVITY);
                  }
                  if (!(conf.length >= needPushCount)) {
                    _context3.next = 14;
                    break;
                  }
                  addPwaGuideFunc();
                  return _context3.abrupt("return", conf);
                case 14:
                  if (this.isNeedShowCheckIn()) {
                    conf.push(PageSkType.DIALOG_TYPE_DAILY_SIGN);
                  }
                  if (!(conf.length >= needPushCount)) {
                    _context3.next = 18;
                    break;
                  }
                  addPwaGuideFunc();
                  return _context3.abrupt("return", conf);
                case 18:
                  needShowFirstRecharge = this.isNeedShowFirstRecharge(); // 首充弹框
                  if (needShowFirstRecharge) {
                    conf.push(PageSkType.DIALOG_TYPE_FIRST_TOP_UP);
                  }
                  if (!(conf.length >= needPushCount)) {
                    _context3.next = 23;
                    break;
                  }
                  addPwaGuideFunc();
                  return _context3.abrupt("return", conf);
                case 23:
                  // 没有首充时，再显示每日首充充值弹框
                  if (!needShowFirstRecharge) {
                    // 每日首充充值
                    if (this.isNeedShowDailyFirstRecharge()) {
                      conf.push(PageSkType.DIALOG_TYPE_DAILY_FIRST_DEPOSIT);
                    }
                  }
                  addPwaGuideFunc();
                  return _context3.abrupt("return", conf);
                case 26:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function initPlayerDayNormalLoginConfBySort() {
            return _initPlayerDayNormalLoginConfBySort.apply(this, arguments);
          }
          return initPlayerDayNormalLoginConfBySort;
        }();
        _proto.isNeedShowCheckIn = function isNeedShowCheckIn() {
          // 活动开关关闭，不展示签到弹框
          // let switchList: any = DataMgr.getInstance().hallData.getActivitySwitch() || []
          // if (!switchList.includes(DialogType.DIALOG_TYPE_DAILY_SIGN)) return false;

          // 如果没有签到红点，视为没有签到可领取
          var hasCheckInReddot = gameDataMgr.redDotSet.has(RedDotType.RED_DOT_DAILY_SIGN);
          if (!hasCheckInReddot) {
            return false;
          }
          return true;
        };
        _proto.isNeedShowWheelActivity = function isNeedShowWheelActivity() {
          // 如果没有转盘充值活动红点，视为没有转盘充值活动可领取
          var hasWheelActivityReddot = gameDataMgr.redDotSet.has(RedDotType.RED_DOT_WHEEL_ACTIVITY);
          if (!hasWheelActivityReddot) {
            return false;
          }
          return true;
        }

        /**
         * 每日首次充值弹窗，如果玩家还未首充过，则不弹每日首笔充值弹框
         * @returns 
         */;
        _proto.isNeedShowDailyFirstRecharge = function isNeedShowDailyFirstRecharge() {
          if (this.isNeedShowFirstRecharge()) {
            return false;
          }

          // 如果玩家今日还未充值过 + 并且没有超过今日最大展示次数，才展示每日首充充值弹窗
          return PayUtils.isDailyFirstPayActVail;
        }

        /**
         * 首充活动是否参与过
         * @returns 
         */;
        _proto.isNeedShowFirstRecharge = function isNeedShowFirstRecharge() {
          return !PayUtils.isFirstPayActBuyed;
        };
        _proto.checkShowGuideWidDialog = function checkShowGuideWidDialog() {
          var show = false;
          var userInfo = gameDataMgr.userInfo;
          // userInfo.pbfixRemainValueBalance = 0
          var openTag = "";
          if (userInfo) {
            if (PayUtils.hasRecharge) {
              // 充值过，判断是否引导cash提现

              var widInfoIsVaild = NGame.storage.get(StorageKey.CASH_WITHDRWA_INFO_VAILD);
              // `HasRecharge -> RemainValue = ${userInfo.pbfixRemainValueBalance}, widInfoIsVaild = ${widInfoIsVaild}`.logI(`ujbd7993t71`);
              show = userInfo.pbfixRemainValueBalance <= 0 && !widInfoIsVaild;
              openTag = "Cash";
            } else {
              // 没充值过，判断是否引导Bonus提现

              var hallConf = gameDataMgr.hallConf;
              if (hallConf) {
                var bonusIsStandard = safetyNum(userInfo.pbfixBonus) >= safetyNum(hallConf.pbfixBonusWMinBalance);
                var _widInfoIsVaild = NGame.storage.get(StorageKey.FREE_BONUS_WITHDRWA_INFO_VAILD);
                // `NoRecharge -> bonusIsStandard = ${bonusIsStandard}, widInfoIsVaild = ${widInfoIsVaild}`.logI(`ujbd7993t71`)
                show = bonusIsStandard && !_widInfoIsVaild;
                openTag = "FreeBonus";
              }
            }
          }
          if (show) {
            UIHelper.openUI(GuideWidDialog, UIPath.GuideWidDialog, undefined, {
              init: {
                openTag: openTag
              }
            });
          }
        }

        /**
         * 事件屏蔽层
         */;
        _proto.showTouchMask = function showTouchMask() {
          var _this2 = this;
          // console.log("showTouchMask-->");

          this.clearTouchMaskSchedule();
          this.myTween = tween(this).delay(1.5).call(function () {
            _this2.myTween = null; // 执行完重置
            _this2.clearTouchMaskSchedule();
          }).start();
          if (isValid(this.touchMaskNode)) {
            this.touchMaskNode.active = true;
          } else {
            // 1. 获取当前场景实例
            var scene = director.getScene();

            // 2. 找到 Canvas 节点（大部分场景逻辑挂在这里）
            var canvasNode = scene.getChildByPath("Canvas");
            if (!canvasNode) {
              return;
            }
            var rootNode = canvasNode.child('ndoe_global_touch');
            if (!rootNode) {
              return;
            }

            // 添加一个事件屏蔽组件，屏蔽点击事件
            var winSize = view.getVisibleSize();
            var blockNode = new Node("blockInput");
            var blockTransform = blockNode.addComponent(UITransform);
            blockTransform.setContentSize(winSize);
            blockNode.setPosition(new Vec3(0, 0, 0));
            blockNode.addComponent(BlockInputEvents);
            rootNode.addChild(blockNode);
            this.touchMaskNode = blockNode;
          }
        };
        _proto.clearTouchMaskSchedule = function clearTouchMaskSchedule() {
          if (this.myTween) {
            this.myTween.stop();
            this.myTween = null;
          }
          if (isValid(this.touchMaskNode)) {
            this.touchMaskNode.active = false;
          }
        };
        _proto.removeTouchMask = function removeTouchMask() {
          // console.log("removeTouchMask-->");
          if (isValid(this.touchMaskNode)) {
            this.touchMaskNode.destroy();
            this.touchMaskNode = null;
          }
        };
        return HallDialogService;
      }());
      HallDialogService.instance = void 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HelpPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './Utils.ts', './SwitchTabData.ts', './FreeBonusWithdraw.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Sprite, UITransform, Tween, tween, ScrollView, GloTitleBar, EventName, HomeTabIndex, TabEvent, inject, gloEvent, MKViewBase, NGame, gameDataMgr, safetyNum, Utils, SwitchTabData, FreeBonusWithdraw, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Tween = module.Tween;
      tween = module.tween;
      ScrollView = module.ScrollView;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }, function (module) {
      FreeBonusWithdraw = module.FreeBonusWithdraw;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "97472W6z0JJ0qW375dmQCU+", "HelpPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 帮助页面
       */
      var HelpPage = exports('HelpPage', (_dec = ccclass('HelpPage'), _dec2 = inject("GloTitleBar", GloTitleBar), _dec3 = inject("ScrollView/view/contentRule/D5/node_releaseback/cashProLb", Node), _dec4 = inject("ScrollView/view/contentRule/D5/node_releaseback/myCashLb", Node), _dec5 = inject("ScrollView/view/contentRule/D5/node_releaseback/cashpro", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(HelpPage, _MKViewBase);
        function HelpPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "freeBonusProgressLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "freeBonusLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "freeBonusProgressSprite", _descriptor4, _assertThisInitialized(_this));
          _this.allNode = {};
          _this.selctNods = [];
          _this.posNode = [];
          _this.selectInx = 0;
          return _this;
        }
        var _proto = HelpPage.prototype;
        _proto.open = function open() {
          var _gameDataMgr$userInfo,
            _gameDataMgr$hallConf,
            _this2 = this;
          this.gloTitleBar.initBar("Help & Guidance".i18nStr(), this.closeAndDestroy.bind(this));
          this.allNode = this.getAllChildrenMap(this.node);
          this.selctNods = [this.allNode.topIC, this.allNode.D3, this.allNode.D7, this.allNode.D8, this.allNode.D9, this.allNode.node_currency];
          var _curbouns = safetyNum((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixBonus).cToRateNum();
          var bonusWMinBalance = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixBonusWMinBalance).cToRateNum();
          var curbouns = _curbouns / bonusWMinBalance;
          var proBb = Utils.changeMoneyUnit(_curbouns, 3) + "/" + Utils.changeMoneyUnit(bonusWMinBalance, 3);
          this.freeBonusProgressLabel.getComponent(Label).string = proBb;
          this.freeBonusProgressSprite.getComponent(Sprite).fillRange = curbouns;
          this.freeBonusLabel.getComponent(Label).string = Utils.changeMoneyUnit(_curbouns, 1);
          this.updateBtnList();
          this.onClicked(this.allNode.WithdrawBtn, function () {
            if (_this2.isForceLogin()) return;
            _this2.openWdPage();
          });
          this.onClicked(this.allNode.InvitBtn, function () {
            if (_this2.isForceLogin()) return;
            _this2.openSharePage();
          });
          this.onClicked(this.allNode.WithdrawBtn2, function () {
            if (_this2.isForceLogin()) return;
            _this2.openFreeWdPage();
          });
          this.onClicked(this.allNode.ViewNowBtn, function () {
            if (_this2.isForceLogin()) return;
            _this2.openPromotePage();
          });
          this.onClicked(this.allNode.ClaimBtn, function () {
            if (_this2.isForceLogin()) return;
            _this2.openBonusPage();
          });
          this.onClicked(this.allNode.BecomeVip, function () {
            if (_this2.isForceLogin()) return;
            _this2.openRechargePage();
          });
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        };
        _proto.isForceLogin = function isForceLogin() {
          if (gameDataMgr.isGoStraightToHall) {
            GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
            gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
            return true;
          }
          return false;
        };
        _proto.updateList = function updateList() {
          if (this.posNode.length == 0) {
            for (var index = 0; index < this.selctNods.length; index++) {
              if (this.selctNods[index + 1]) {
                this.posNode.push({
                  min: -this.selctNods[index].y,
                  max: -this.selctNods[index + 1].y
                });
              } else {
                this.posNode.push({
                  min: -this.selctNods[index].y,
                  max: this.allNode.contentRule.getComponent(UITransform).height
                });
              }
            }
          }
          for (var _index = 0; _index < this.selctNods.length; _index++) {
            if (this.posNode[_index].min <= this.allNode.contentRule.position.y && this.posNode[_index].max > this.allNode.contentRule.position.y) {
              if (_index != this.selectInx) {
                this.selectInx = _index;
                this.updateBtnList();
              }
            }
          }
        };
        _proto.toView = function toView() {
          Tween.stopAllByTarget(this.allNode.contentRule);
          // let speed = Math.abs(-(this.selctNods[this.selectInx].y) - this.allNode.contentRule.position.y) / 4000
          tween(this.allNode.contentRule).to(0, {
            y: -this.selctNods[this.selectInx].y
          }).start();
          // tween(this.allNode.contentRule)
          //     .to(speed, { y: -(this.selctNods[this.selectInx].y) })
          //     .start();
        };

        _proto.updateBtnList = function updateBtnList() {
          var _this3 = this;
          this.allNode.btnList.children.forEach(function (btn, index) {
            btn.getChildByName("xz").active = index == _this3.selectInx;
            _this3.onClicked(btn, function () {
              _this3.allNode.ScrollView.getComponent(ScrollView).stopAutoScroll();
              _this3.scheduleOnce(function () {
                _this3.selectInx = index;
                _this3.updateBtnList();
                _this3.toView();
              }, 0.1);
            });
          });
        };
        _proto.openWdPage = function openWdPage() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
            event: TabEvent.DEPOSIT_W
          }));
          this.closeView();
        };
        _proto.openFreeWdPage = function openFreeWdPage() {
          NGame.uiManage.open(FreeBonusWithdraw);
          this.closeView();
        };
        _proto.openSharePage = function openSharePage() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Share));
          this.closeView();
        };
        _proto.openPromotePage = function openPromotePage() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Promotion));
          this.closeView();
        };
        _proto.openBonusPage = function openBonusPage() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Bonus));
          this.closeView();
        };
        _proto.openRechargePage = function openRechargePage() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
            event: TabEvent.DEPOSIT_DEPOSIT
          }));
          this.closeView();
        };
        _proto.closeView = function closeView() {
          this.closeAndDestroy();
          gloEvent.emit(EventName.REQUEST_CLOSE_PAGE_USER_INFO); // 关闭个人信息页面
          gloEvent.emit(EventName.REQUEST_CLOSE_PAGE_SIDEBAR); // 关闭侧栏页面
        };

        return HelpPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "freeBonusProgressLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "freeBonusLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "freeBonusProgressSprite", [_dec5], {
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

System.register("chunks:///_virtual/HowToPayDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './MKViewBase.ts', './GameDataMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, sys, inject, MKViewBase, gameDataMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      sys = module.sys;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "26876opDVVB6o256UOFXLjx", "HowToPayDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var HowToPayDialog = exports('HowToPayDialog', (_dec = ccclass('HowToPayDialog'), _dec2 = inject("content/bg/node1", Node), _dec3 = inject("content/bg/node2", Node), _dec4 = inject("content/bg/list", Node), _dec5 = inject("content/item", Node), _dec6 = inject("content/btnClose", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(HowToPayDialog, _MKViewBase);
        function HowToPayDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "node1", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "node2", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "list", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnClose", _descriptor5, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = HowToPayDialog.prototype;
        _proto.open = function open() {
          var _this2 = this;
          var list = gameDataMgr.payConf.pbfixPayStudyList;
          list.forEach(function (data) {
            var item = instantiate(_this2.item);
            item.active = true;
            item.child("text").setText(data.pbfixTitle);
            _this2.list.addChild(item);
            _this2.onClicked(item, function () {
              if (data.pbfixUrl && data.pbfixUrl.length > 0) {
                // WebviewUtil.showWebview(data.pbfixUrl);
                sys.openURL(data.pbfixUrl);
              }
            });
          });
          this.onClicked(this.btnClose, this.closeAndDestroy.bind(this));
        };
        return HowToPayDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "node1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "node2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "item", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec6], {
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

System.register("chunks:///_virtual/IncomesTab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './Utils.ts', './BaseTabPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, inject, gameDataMgr, HttpPbFunc, isResponseValid, Utils, BaseTabPage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "304aanPy8ZMzq7aa+7VYkpL", "IncomesTab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var IncomesTab = exports('IncomesTab', (_dec = ccclass('IncomesTab'), _dec2 = inject("ScrollView/view/content", Node), _dec3 = inject("ScrollView/view/content/item", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(IncomesTab, _BaseTabPage);
        function IncomesTab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scrollViewContent", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "todayIncomesItem", _descriptor2, _assertThisInitialized(_this));
          _this.totalIncomesItem = null;
          return _this;
        }
        var _proto = IncomesTab.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onLoad = function onLoad() {};
        _proto.open = function open() {
          this.totalIncomesItem = instantiate(this.todayIncomesItem);
          this.scrollViewContent.addChild(this.totalIncomesItem);
          this.totalIncomesItem.child("titleNode").child("Label").setText("Total income:".i18nStr());
        };
        _proto.onEnable = function onEnable() {
          this.reloadData();
        };
        _proto.initUi = function initUi() {
          this.fillData(gameDataMgr.referralData.pbfixTodayAchievement, this.todayIncomesItem);
          this.fillData(gameDataMgr.referralData.pbfixTotalAchievement, this.totalIncomesItem);
        };
        _proto.fillData = function fillData(data, viewNode) {
          var _data$pbfixIncomeAmou, _data$pbfixInviteRewa, _data$pbfixAchievemen, _data$pbfixRechargeRe, _data$pbfixBetRebateA;
          viewNode.child("titleNode").child("incomeNum").setText(Utils.setCurrency((_data$pbfixIncomeAmou = data.pbfixIncomeAmount) == null ? void 0 : _data$pbfixIncomeAmou.cToRateNum()));
          var infoNode = viewNode.child("info");
          infoNode.child("inviteRewards").child("value").setText(Utils.setCurrency(data == null || (_data$pbfixInviteRewa = data.pbfixInviteRewardAmount) == null ? void 0 : _data$pbfixInviteRewa.cToRateNum()));
          infoNode.child("achRewards").child("value").setText(Utils.setCurrency(data == null || (_data$pbfixAchievemen = data.pbfixAchievementRewardAmount) == null ? void 0 : _data$pbfixAchievemen.cToRateNum()));
          infoNode.child("depositRewards").child("value").setText(Utils.setCurrency(data == null || (_data$pbfixRechargeRe = data.pbfixRechargeRebateAmount) == null ? void 0 : _data$pbfixRechargeRe.cToRateNum()));
          infoNode.child("bettingRebate").child("value").setText(Utils.setCurrency(data == null || (_data$pbfixBetRebateA = data.pbfixBetRebateAmount) == null ? void 0 : _data$pbfixBetRebateA.cToRateNum()));
          infoNode.child("registers").child("value").setText(data.pbfixRegUserCount);
          infoNode.child("validReferral").child("value").setText(data.pbfixValidReferralCount);
          infoNode.child("depositors").child("value").setText(data.pbfixRechargeUserCount);
        };
        _proto.reloadData = function reloadData() {
          var _this2 = this;
          HttpPbFunc.pbfixReferralDataReq(this.node, function (result) {
            if (isResponseValid(result)) {
              _this2.initUi();
            }
          });
        };
        return IncomesTab;
      }(BaseTabPage), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollViewContent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "todayIncomesItem", [_dec3], {
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

System.register("chunks:///_virtual/InsufficientBalanceDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './Utils.ts', './SwitchTabData.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, UIOpacity, Tween, Vec3, StorageKey, EventName, MoneyType, HomeTabIndex, TabEvent, inject, gloEvent, MKViewBase, NGame, gameDataMgr, safetyNum, SwitchTabData, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Tween = module.Tween;
      Vec3 = module.Vec3;
    }, function (module) {
      StorageKey = module.StorageKey;
      EventName = module.EventName;
      MoneyType = module.MoneyType;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      safetyNum = module.safetyNum;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
      cclegacy._RF.push({}, "1e45frs3zlNB6UUhAz/x1/E", "InsufficientBalanceDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 余额不足弹框引导切换币种
       */
      var InsufficientBalanceDialog = exports('InsufficientBalanceDialog', (_dec = ccclass('InsufficientBalanceDialog'), _dec2 = inject("bg/btn_close", Node), _dec3 = inject("bg/node_btns/btn_confirm", Node), _dec4 = inject("bg/node_btns/btn_deposit", Node), _dec5 = inject("bg/richText_insufficient", Node), _dec6 = inject("bg/richText_switch", Node), _dec7 = inject("bg/node_checkbox/btn_checkbox", Node), _dec8 = inject("bg/node_checkbox/btn_checkbox/checkbox/icon_sel", Node), _dec9 = inject("bg/node_item_type/item_cas/node_layout/label_balance", Node), _dec10 = inject("bg/node_item_type/item_bonus/node_layout/label_balance", Node), _dec11 = inject("bg/node_item_type/item_cas", Node), _dec12 = inject("bg/node_item_type/item_bonus", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(InsufficientBalanceDialog, _MKViewBase);
        function InsufficientBalanceDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "confirmBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "depositBtn", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "curBalanceRichTextLabelNode", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "switchRichTextLabelNode", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "noShowCheckboxNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "noShowCheckboxIconNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cashBalanceLabelNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonusBalanceLabelNode", _descriptor9, _assertThisInitialized(_this));
          // cash balance Item
          _initializerDefineProperty(_this, "cashBalanceItemNode", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonusBalanceItemNode", _descriptor11, _assertThisInitialized(_this));
          // 底图纹理列表
          // @property([SpriteFrame]) 
          // selectIcons: SpriteFrame[] = []; // 对应两个币种的选中状态: 0: 未选中, 1: 选中状态
          _this.curSelCurrencyType = 0;
          // 当前选中的币种类型
          _this.confirmCallback = null;
          return _this;
        }
        var _proto = InsufficientBalanceDialog.prototype;
        _proto.open = function open() {
          GoogleAnalytics.track(GAEvent.DIALOG_INSUFFICIENT_BALANCE);
          NGame.storage.set(StorageKey.HAS_SHOW_INSUFFICIENT_BALANCE_DIALOG, true); // 标记为已展示过
          this.initUI();
          this.onClickEvent();
          this.confirmCallback = this.initData.confirmCallback;
          this.onMsg(EventName.SWITICH_CURRENCY_BY_SWITCHER, this.onSwitchCurrencyBySwitcher);

          // gloEvent.emit(EventName.SHOW_SWITICH_CURRENCY_BUBBLE_ANI);
        };

        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.SWITICH_CURRENCY_BY_SWITCHER, this.onSwitchCurrencyBySwitcher);
        };
        _proto.initUI = function initUI() {
          var _gameDataMgr$userInfo, _gameDataMgr$userInfo2;
          this.cashBalanceLabelNode.setText("$ " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixBalance).cToRateNum());
          this.bonusBalanceLabelNode.setText(" " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixBonus).cToRateNum());

          // 初始化是否不展示
          this.noShowCheckboxIconNode.active = NGame.storage.getBoolean(StorageKey.SEL_NOT_SHOW_INSUFFICIENT_BALANCE_DIALOG, false) === true;

          // 2. 初始化选中状态（从存储获取或默认Cash）
          this.curSelCurrencyType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          this.refreshUI(true);
        };
        _proto.onClickEvent = function onClickEvent() {
          var _this2 = this;
          this.onClicked(this.closeBtn, function () {
            _this2.closeAndDestroy();
          });
          this.onClicked(this.confirmBtn, function () {
            _this2.onClickConfirmBtn();
          });
          this.onClicked(this.depositBtn, function () {
            _this2.onClickDepositBtn();
          });
          this.onClicked(this.noShowCheckboxNode, function () {
            _this2.onClickNoShowCheckbox();
          }, false, 0.5, false);
          this.onClicked(this.cashBalanceItemNode, function () {
            _this2.onBtnSelect(MoneyType.MONEY_TYPE_BALANCE);
          });
          this.onClicked(this.bonusBalanceItemNode, function () {
            _this2.onBtnSelect(MoneyType.MONEY_TYPE_FREE_BONUS);
          });
        }

        // 点击切换币种
        ;

        _proto.onBtnSelect = function onBtnSelect(mType) {
          if (this.curSelCurrencyType == mType) {
            return;
          }
          this.curSelCurrencyType = mType;
          NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, this.curSelCurrencyType);
          this.refreshUI();

          // 发送切换事件
          gloEvent.emit(EventName.SWITICH_CURRENCY_BY_DIALOG, {
            currencyType: this.curSelCurrencyType
          });
        };
        _proto.refreshUI = function refreshUI(isInit) {
          if (isInit === void 0) {
            isInit = false;
          }
          var bankruptcyLine = safetyNum(gameDataMgr.hallConf.pbfixBankruptcyLine);
          var cashBalance = safetyNum(gameDataMgr.userInfo.pbfixBalance);
          var bonusBalance = safetyNum(gameDataMgr.userInfo.pbfixBonus);
          var curCurrencyStr = null;
          if (this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE) {
            // 当前选中cash
            if (cashBalance < bankruptcyLine) {
              curCurrencyStr = "Cash Balance";
            }
          } else {
            if (bonusBalance < bankruptcyLine) {
              curCurrencyStr = "Bonus Balance";
            }
          }
          this.curBalanceRichTextLabelNode.active = curCurrencyStr != null;
          if (curCurrencyStr != null) {
            this.curBalanceRichTextLabelNode.setText("tips_balance_insufficient".i18nStr([curCurrencyStr]));
            var otherCurrencyStr = curCurrencyStr === "Cash Balance" ? "Bonus Balance" : "Cash Balance";
            this.switchRichTextLabelNode.setText("tips_switch_balance".i18nStr([otherCurrencyStr]));
          }

          // this.cashBalanceItemNode.getComponent(Sprite).spriteFrame = this.selectIcons[this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE ? 1 : 0];
          // this.bonusBalanceItemNode.getComponent(Sprite).spriteFrame = this.selectIcons[this.curSelCurrencyType === MoneyType.MONEY_TYPE_FREE_BONUS ? 1 : 0];     
          this.cashBalanceItemNode.child("bg_item_sel_btype").active = this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE;
          this.bonusBalanceItemNode.child("bg_item_sel_btype").active = this.curSelCurrencyType === MoneyType.MONEY_TYPE_FREE_BONUS;
          if (isInit) {
            // 默认是透明状态，第一次需要显示出来
            tween(this.cashBalanceItemNode.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
            tween(this.bonusBalanceItemNode.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
          }
          // this.cashBalanceItemNode.getComponent(Button).interactable = true;
          // this.bonusBalanceItemNode.getComponent(Button).interactable = true;

          // 缩放动效（呼吸效果）
          // this.scheduleOnce(()=>{
          // Tween.stopAllByTarget(this.bonusBalanceItemNode);
          // Tween.stopAllByTarget(this.cashBalanceItemNode);

          // if (this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE) {
          // this.cashBalanceItemNode.getComponent(Button).interactable = false;
          // this.showTypeItemAni(this.cashBalanceItemNode);
          // }else{
          // this.bonusBalanceItemNode.getComponent(Button).interactable = false;
          // this.showTypeItemAni(this.bonusBalanceItemNode);
          //     }
          // },delayShowItemAni)
        };

        _proto.onClickConfirmBtn = function onClickConfirmBtn() {
          var _this$confirmCallback;
          this.closeAndDestroy();
          (_this$confirmCallback = this.confirmCallback) == null || _this$confirmCallback.call(this);
        };
        _proto.onClickDepositBtn = function onClickDepositBtn() {
          gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
            event: TabEvent.DEPOSIT_DEPOSIT
          }));
          this.closeAndDestroy();
        };
        _proto.onClickNoShowCheckbox = function onClickNoShowCheckbox() {
          this.noShowCheckboxIconNode.active = !this.noShowCheckboxIconNode.active;
          NGame.storage.set(StorageKey.SEL_NOT_SHOW_INSUFFICIENT_BALANCE_DIALOG, this.noShowCheckboxIconNode.active);
        };
        _proto.showTypeItemAni = function showTypeItemAni(node) {
          var duration = 1.0;
          var maxScale = 1.04;
          var minScale = 0.99;
          Tween.stopAllByTarget(node);
          tween(node).repeatForever(tween().to(duration, {
            scale: new Vec3(maxScale, maxScale, 1)
          }, {
            easing: 'sineInOut'
          }).delay(0.3).to(duration, {
            scale: new Vec3(minScale, minScale, 1)
          }, {
            easing: 'sineInOut'
          })).start();
        };
        _proto.onSwitchCurrencyBySwitcher = function onSwitchCurrencyBySwitcher() {
          var latestSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          if (this.curSelCurrencyType == latestSelType) {
            return;
          }
          this.curSelCurrencyType = latestSelType;
          this.refreshUI();
        };
        return InsufficientBalanceDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "confirmBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "depositBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "curBalanceRichTextLabelNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "switchRichTextLabelNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "noShowCheckboxNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "noShowCheckboxIconNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cashBalanceLabelNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bonusBalanceLabelNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cashBalanceItemNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "bonusBalanceItemNode", [_dec12], {
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

System.register("chunks:///_virtual/InviteFriendsTab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameCfg.ts', './Constant.ts', './Decorators.ts', './VScrollView.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PlatformUtils.ts', './ShareUtils.ts', './Utils.ts', './BaseTabPage.ts', './ShareTableView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, NodePool, v3, tween, UITransform, EditBox, instantiate, GameCfg, RATE_FEE, inject, VirtualScrollView, NGame, gameDataMgr, HttpPbFunc, isResponseValid, pbfixReferralRewardType, PlatformUtils, ShareUtils, Utils, safetyNum, BaseTabPage, ShareTableView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      NodePool = module.NodePool;
      v3 = module.v3;
      tween = module.tween;
      UITransform = module.UITransform;
      EditBox = module.EditBox;
      instantiate = module.instantiate;
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      RATE_FEE = module.RATE_FEE;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixReferralRewardType = module.pbfixReferralRewardType;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      ShareUtils = module.ShareUtils;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      ShareTableView = module.ShareTableView;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "a845aGXFhxO7YXY87SH0Oxx", "InviteFriendsTab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var InviteFriendsTab = exports('InviteFriendsTab', (_dec = ccclass('InviteFriendsTab'), _dec2 = inject("ScrollView", VirtualScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(InviteFriendsTab, _BaseTabPage);
        function InviteFriendsTab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "listView", _descriptor, _assertThisInitialized(_this));
          _this.ITEM_TYPE_TOP_INFO = 0;
          _this.ITEM_TYPE_BIND_INVITE_CODE = 1;
          _this.ITEM_TYPE_MIDDLE_INFO = 2;
          _this.ITEM_TYPE_REWARDS_INFO = 3;
          _this.ITEM_TYPE_EXPLANATIONS = 4;
          _this.ITEM_TYPE_LEADER_BOARD = 5;
          _this.currency = GameCfg.currency;
          _this.lbItemNodePool = new NodePool();
          _this.curPlayIndex = 0;
          _this.isFirstOpen = true;
          _this.itemTypeList = [];
          _this.tableItemPool = new NodePool();
          _this.isLeaderBoardInited = false;
          _this.loopLeaderBoardTask = function (itemNode, playerRewardList) {
            var _tween;
            var lbRewardsList = itemNode.getChildByPath("bg/rewardsList");
            var player = null;
            if (playerRewardList.length > 0) {
              player = playerRewardList[_this.curPlayIndex];
              _this.curPlayIndex++;
              if (_this.curPlayIndex >= playerRewardList.length) {
                _this.curPlayIndex = 0;
              }
            }
            var item = _this.createLbItem(itemNode, player);
            lbRewardsList.addChild(item);
            var preItem = lbRewardsList.children[lbRewardsList.children.length - 2];
            if (preItem) {
              item.position = preItem.position.clone().add(v3(0, -item.contentSize().height - 20));
            }
            var actionArr = [];
            lbRewardsList.children.forEach(function (item, index) {
              actionArr.push(tween(item).to(0.5, {
                position: item.position.clone().add(v3(0, item.contentSize().height + 20))
              }));
            });
            (_tween = tween(lbRewardsList)).parallel.apply(_tween, actionArr).bindNodeState(false).call(function () {
              _this.lbItemNodePool.put(lbRewardsList.children[0]);
            }).start();
          };
          return _this;
        }
        var _proto = InviteFriendsTab.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onLoad = function onLoad() {
          this.node.getComponent(UITransform).height = this.node.parent.contentSize().height;
          this.listView.node.getComponent(UITransform).height = this.node.parent.contentSize().height;
        };
        _proto.start = function start() {
          if (gameDataMgr.referralData) {
            this.initUi();
          } else {
            this.reloadData();
          }
        }

        // protected onEnable(): void {
        //     `onEnable`.logI(`asiofdaoish012535`)
        // if (!this.isFirstOpen) {
        //     this.reloadData();
        // }
        // this.isFirstOpen = false;
        // }

        // protected onDisable(): void {
        //     `onDisable`.logI(`asiofdaoish012535`)
        //     this.listView.scrollToTop();
        //     this.listView.refreshList(0)
        // }
        ;

        _proto.onPageShow = function onPageShow() {
          this.reloadData();
        };
        _proto.open = function open() {
          var _this2 = this;
          this.listView.getItemTypeIndexFn = function (index) {
            return _this2.itemTypeList[index];
          };
          this.listView.renderItemFn = function (itemNode, index) {
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_TOP_INFO) {
              _this2.setTopInfo(itemNode);
            }
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_BIND_INVITE_CODE) {
              _this2.setBindInviteCode(itemNode);
            }
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_MIDDLE_INFO) {
              _this2.updateMiddleInfo(itemNode);
            }
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_REWARDS_INFO) {
              _this2.updateRewardsInfo(itemNode);
            }
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_EXPLANATIONS) {
              _this2.updateExplanations(itemNode);
            }
            if (_this2.itemTypeList[index] == _this2.ITEM_TYPE_LEADER_BOARD) {
              _this2.loopLeaderBoard(itemNode);
            }
          };
        };
        _proto.initUi = function initUi() {
          var _gameDataMgr$userInfo,
            _this3 = this;
          this.itemTypeList = [];
          this.itemTypeList.push(this.ITEM_TYPE_TOP_INFO);

          // 如果已经被绑定了，则不显示绑定UI
          var parentUid = (((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixParentUid) || '').toString();
          // console.log("parentUid:",parentUid);

          if (parentUid.length == 0) {
            this.itemTypeList.push(this.ITEM_TYPE_BIND_INVITE_CODE);
          }
          this.itemTypeList.push(this.ITEM_TYPE_MIDDLE_INFO);
          this.itemTypeList.push(this.ITEM_TYPE_REWARDS_INFO);
          this.listView.refreshList(this.itemTypeList);
          this.scheduleOnce(function () {
            _this3.itemTypeList.push(_this3.ITEM_TYPE_EXPLANATIONS);
            _this3.itemTypeList.push(_this3.ITEM_TYPE_LEADER_BOARD);
            _this3.listView.refreshList(_this3.itemTypeList);
          });
        };
        _proto.setTopInfo = function setTopInfo(itemNode) {
          var shareLink = itemNode.child("ShareLink");
          var url = '';
          if (!PlatformUtils.isMobileNative()) {
            // web端直接打开H5链接
            // const gameH5Url = gameDataMgr.hallConf?.pbfixShareInfo?.pbfixH5Url || ''
            var gameH5Url = "https://" + (GameCfg.domin || "");
            url = gameH5Url + "?inviteCode=" + gameDataMgr.userInfo.pbfixInviteCode;
          } else {
            var _gameDataMgr$hallConf;
            // 移动端直接引导进入落地页面下载app
            var landingPageUrl = ((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null || (_gameDataMgr$hallConf = _gameDataMgr$hallConf.pbfixShareInfo) == null ? void 0 : _gameDataMgr$hallConf.pbfixShareUrl) || '';
            url = landingPageUrl + "?inviteCode=" + gameDataMgr.userInfo.pbfixInviteCode;
          }
          shareLink.child("url").setText(url);
          var copyToClipboard = function copyToClipboard() {
            PlatformUtils.copyToClipboard(url);
            NGame.tips.toast("copy success".i18nStr());
          };
          this.onClicked(shareLink, function () {
            copyToClipboard();
          }, true, 0.1, false);
          this.onClicked(itemNode.child("icons").child("btnShare"), function () {
            // 系统分享
            PlatformUtils.shareContent({
              url: url,
              text: shareText
            });
          });
          var shareText = "shareText".i18nStr([Utils.setCurrency(safetyNum(gameDataMgr.hallConf.pbfixGiftReg).cToRateNum())]);
          this.onClicked(itemNode.child("icons").child("btnFB"), function () {
            var options = {
              url: url,
              text: shareText
            };
            ShareUtils.shareToFacebook(options);
          });
          this.onClicked(itemNode.child("icons").child("btnWhatsapp"), function () {
            var options = {
              url: url,
              text: shareText
            };
            ShareUtils.shareToWhatsApp(options);
          });
          this.onClicked(itemNode.child("icons").child("btnTG"), function () {
            var options = {
              url: url,
              text: shareText
            };
            ShareUtils.shareToTelegram(options);
          });
        };
        _proto.setBindInviteCode = function setBindInviteCode(itemNode) {
          var _this4 = this;
          this.onClicked(itemNode.child("btnBindInviteCode"), function () {
            var bindCodeEditBox = itemNode.child("EditBox");
            var inviteCode = bindCodeEditBox.getComponent(EditBox).string;
            if (inviteCode && inviteCode.length > 0) {
              HttpPbFunc.pbfixBindInviteCodeReq(_this4.node, inviteCode, function (result) {
                // this.reloadData();
                _this4.initUi();
                // if (this.bindInviteCodeNode) {
                //     this.bindInviteCodeNode.active = false;
                // }
              });
            } else {
              NGame.tips.toast("Please enter the invitation code".i18nStr());
            }
          });
        };
        _proto.updateMiddleInfo = function updateMiddleInfo(itemNode) {
          var _todayAchievement$pbf, _yesterdayAchievement;
          var data = gameDataMgr.referralData;
          var todayAchievement = data.pbfixTodayAchievement;
          var yesterdayAchievement = data.pbfixYesterdayAchievement;
          var totalAchievement = data.pbfixTotalAchievement;
          itemNode.child("todayIncome").child("value").setText(Utils.setCurrency(todayAchievement == null || (_todayAchievement$pbf = todayAchievement.pbfixIncomeAmount) == null ? void 0 : _todayAchievement$pbf.cToRateNum()));
          itemNode.child("yesterdayIncome").child("value").setText(Utils.setCurrency(yesterdayAchievement == null || (_yesterdayAchievement = yesterdayAchievement.pbfixIncomeAmount) == null ? void 0 : _yesterdayAchievement.cToRateNum()));
          itemNode.child("registers").child("value").setText(safetyNum(totalAchievement.pbfixRegUserCount));
          itemNode.child("vaildReferral").child("value").setText(safetyNum(totalAchievement.pbfixValidReferralCount));
        };
        _proto.updateRewardsInfo = function updateRewardsInfo(itemNode) {
          var data = gameDataMgr.referralData;
          var setRewardInfo = function setRewardInfo(childName, rewardType) {
            var _rewardData$pbfixRewa;
            var rewardData = data.pbfixTotalRewardList.find(function (r) {
              return r.pbfixRewardType == rewardType;
            });
            itemNode.child(childName).child("value").setText(Utils.setCurrency(rewardData == null || (_rewardData$pbfixRewa = rewardData.pbfixRewardAmount) == null ? void 0 : _rewardData$pbfixRewa.cToRateNum()));
          };
          setRewardInfo("invitationRewards", pbfixReferralRewardType.pbfixREWARD_TYPE_INVITE);
          setRewardInfo("achievementRewards", pbfixReferralRewardType.pbfixREWARD_TYPE_ACHIEVEMENT);
          setRewardInfo("depositRebate", pbfixReferralRewardType.pbfixREWARD_TYPE_RECHARGE);
          setRewardInfo("bettingRebate", pbfixReferralRewardType.pbfixREWARD_TYPE_BET);
        };
        _proto.updateExplanations = function updateExplanations(itemNode) {
          this.setBaseConfigData(itemNode);
          this.setAllShareTableData(itemNode);
        };
        _proto.setBaseConfigData = function setBaseConfigData(itemNode) {
          var _gameDataMgr$referral, _gameDataMgr$referral2, _gameDataMgr$referral3, _gameDataMgr$hallConf2;
          var minRechargeAmount = safetyNum((_gameDataMgr$referral = gameDataMgr.referralData) == null ? void 0 : _gameDataMgr$referral.pbfixReferralMinRechargeAmount).cToRateNum();
          var minPerRewardAmount = safetyNum((_gameDataMgr$referral2 = gameDataMgr.referralData) == null || (_gameDataMgr$referral2 = _gameDataMgr$referral2.pbfixRewardConfigList[0]) == null ? void 0 : _gameDataMgr$referral2.pbfixPerRewardAmount).cToRateNum();

          // itemNode.child(`exp1`).child(`Label`).setText(`Agent Commisslon`.i18nStr())
          // itemNode.child(`exp2`).child(`RichText`).setText(`Program Overview`.i18nStr())
          // itemNode.child(`exp4`).child(`RichText1`).setText(`Agent Rebate Plan 2`.i18nStr())

          itemNode.child("exp3").child("RichText").setText("What is a Qualified Customer".i18nStr(["" + this.currency + minRechargeAmount]));
          itemNode.child("exp4").child("RichText").setText("Agent Rebate Plan 1".i18nStr(["" + this.currency + minRechargeAmount, "" + this.currency + minPerRewardAmount, "" + this.currency + minRechargeAmount, "" + this.currency + minPerRewardAmount]));
          var example2Data = gameDataMgr.referralData.pbfixAchievementConfigList[4];
          itemNode.child("exp4").child("RichText2").setText("Example 2".i18nStr([safetyNum(example2Data == null ? void 0 : example2Data.pbfixInviteCount).toString(), "" + this.currency + safetyNum(example2Data == null ? void 0 : example2Data.pbfixRewardAmount).cToRateNum()]));
          var minCommissionRate = safetyNum(gameDataMgr == null || (_gameDataMgr$referral3 = gameDataMgr.referralData) == null || (_gameDataMgr$referral3 = _gameDataMgr$referral3.pbfixRechargeCommissionConf) == null ? void 0 : _gameDataMgr$referral3.pbfixCommissionRate).cToFeeRateNum();
          itemNode.child("exp5").child("RichText").setText("Agent Rebate Plan 3".i18nStr([minCommissionRate + "%"]));
          var example3RechargeAmount = 1000;
          itemNode.child("exp5").child("RichText1").setText("Example 3".i18nStr(["" + this.currency + example3RechargeAmount, "" + this.currency + example3RechargeAmount * (minCommissionRate / RATE_FEE)]));
          itemNode.child("exp9").child("RichText").setText("Ready to start earning with".i18nStr([((_gameDataMgr$hallConf2 = gameDataMgr.hallConf) == null || (_gameDataMgr$hallConf2 = _gameDataMgr$hallConf2.pbfixShareInfo) == null ? void 0 : _gameDataMgr$hallConf2.pbfixH5Url) || '']));
        };
        _proto.setAllShareTableData = function setAllShareTableData(itemNode) {
          var _gameDataMgr$referral4,
            _this5 = this,
            _gameDataMgr$referral5,
            _gameDataMgr$referral6,
            _gameDataMgr$referral7;
          var inviteBonusData = ["Number of invitees".i18nStr(), "Bonus".i18nStr(), "Bonus turnover".i18nStr()];
          (_gameDataMgr$referral4 = gameDataMgr.referralData.pbfixRewardConfigList) == null || _gameDataMgr$referral4.forEach(function (cfg) {
            var _cfg$pbfixMaxInviteCo, _cfg$pbfixMinInviteCo;
            var maxInviteCount = (_cfg$pbfixMaxInviteCo = cfg.pbfixMaxInviteCount) != null ? _cfg$pbfixMaxInviteCo : 0;
            inviteBonusData.push("" + ((_cfg$pbfixMinInviteCo = cfg.pbfixMinInviteCount) != null ? _cfg$pbfixMinInviteCo : 0) + (maxInviteCount > 0 ? "-" + maxInviteCount : "+") + " " + "invites".i18nStr());
            inviteBonusData.push("" + _this5.currency + safetyNum(cfg == null ? void 0 : cfg.pbfixPerRewardAmount).cToRateNum() + " " + "per invite".i18nStr());
            inviteBonusData.push(safetyNum(cfg == null ? void 0 : cfg.pbfixBetRate).cToFeeRateNum() + "x");
          });
          itemNode.getChildByPath("exp4/tableNode1/shareTable1").getComponent(ShareTableView).initTableView(this.tableItemPool, inviteBonusData);
          var achievementBonusData = ["number of valid people".i18nStr(), "Bonus".i18nStr(), "Bonus turnover".i18nStr()];
          (_gameDataMgr$referral5 = gameDataMgr.referralData.pbfixAchievementConfigList) == null || _gameDataMgr$referral5.forEach(function (cfg) {
            var _cfg$pbfixInviteCount;
            achievementBonusData.push(((_cfg$pbfixInviteCount = cfg.pbfixInviteCount) != null ? _cfg$pbfixInviteCount : 0) + " " + "invites".i18nStr());
            achievementBonusData.push("" + _this5.currency + safetyNum(cfg == null ? void 0 : cfg.pbfixRewardAmount).cToRateNum());
            achievementBonusData.push(safetyNum(cfg == null ? void 0 : cfg.pbfixBetRate).cToFeeRateNum() + "x");
          });
          itemNode.getChildByPath("exp4/tableNode2/shareTable2").getComponent(ShareTableView).initTableView(this.tableItemPool, achievementBonusData);
          var rechargeCfg = gameDataMgr.referralData.pbfixRechargeCommissionConf;
          var rechargeBonusData = ["the referred user's yesterday deposit amount".i18nStr(), "Bonus".i18nStr(), "Bonus turnover".i18nStr(), "\u2267" + this.currency + safetyNum((_gameDataMgr$referral6 = gameDataMgr.referralData) == null ? void 0 : _gameDataMgr$referral6.pbfixReferralMinRechargeAmount).cToRateNum(), safetyNum(rechargeCfg.pbfixCommissionRate).cToFeeRateNum() + "%", safetyNum(rechargeCfg.pbfixBetRate).cToFeeRateNum() + "x"];
          itemNode.getChildByPath("exp5/tableNode3/shareTable3").getComponent(ShareTableView).initTableView(this.tableItemPool, rechargeBonusData);
          var bettingBonusData = ["Betting Rebate Tiers".i18nStr(), "Commission rate".i18nStr(), "Bonus turnover".i18nStr()];
          (_gameDataMgr$referral7 = gameDataMgr.referralData.pbfixBetCommissionConfigList) == null || _gameDataMgr$referral7.forEach(function (cfg) {
            var _cfg$pbfixLevel;
            bettingBonusData.push("Level".i18nStr() + " " + ((_cfg$pbfixLevel = cfg.pbfixLevel) != null ? _cfg$pbfixLevel : 0));
            bettingBonusData.push(safetyNum(cfg == null ? void 0 : cfg.pbfixCommissionRate).cToFeeRateNum() + "%");
            bettingBonusData.push(safetyNum(cfg == null ? void 0 : cfg.pbfixBetRate).cToFeeRateNum() + "x");
          });
          itemNode.getChildByPath("exp6/tableNode4/shareTable4").getComponent(ShareTableView).initTableView(this.tableItemPool, bettingBonusData);
        };
        _proto.loopLeaderBoard = function loopLeaderBoard(itemNode) {
          var _gameDataMgr$referral8;
          if (this.isLeaderBoardInited) {
            return;
          }
          this.isLeaderBoardInited = true;
          this.unscheduleAllCallbacks();
          var lbRewardsList = itemNode.getChildByPath("bg/rewardsList");
          var playerRewardList = (_gameDataMgr$referral8 = gameDataMgr.referralData.pbfixPlayerRewardList) != null ? _gameDataMgr$referral8 : [];
          for (var i = 0; i < 4; i++) {
            lbRewardsList.addChild(this.createLbItem(itemNode, playerRewardList[i]));
          }
          this.curPlayIndex = 4;
          this.schedule(this.loopLeaderBoardTask.bind(this, itemNode, playerRewardList), 3);
        };
        _proto.createLbItem = function createLbItem(itemNode, player) {
          if (player === void 0) {
            player = null;
          }
          var item = this.lbItemNodePool.get();
          if (!item) {
            item = instantiate(itemNode.getChildByPath("bg/item"));
          }
          item.active = true;
          var idStr = Utils.randomNumString(7);
          var amountStr = Utils.setCurrency(8.8);
          if (player) {
            var _player;
            idStr = player.pbfixUid.toString();
            amountStr = Utils.setCurrency((_player = player) == null || (_player = _player.pbfixRewardAmount) == null ? void 0 : _player.cToRateNum());
          }
          idStr = idStr.replace(idStr.substring(2, 6), '****');
          item.child("id").setText(idStr);
          item.child("money").setText(amountStr);
          return item;
        };
        _proto.reloadData = function reloadData() {
          var _this6 = this;
          HttpPbFunc.pbfixReferralDataReq(this.node, function (result) {
            if (isResponseValid(result)) {
              if (gameDataMgr.referralData) {
                _this6.listView.refreshIndex(_this6.itemTypeList.indexOf(_this6.ITEM_TYPE_MIDDLE_INFO));
                _this6.listView.refreshIndex(_this6.itemTypeList.indexOf(_this6.ITEM_TYPE_REWARDS_INFO));
              }
            }
          });
        };
        _proto.onDestroy = function onDestroy() {
          this.tableItemPool.clear();
        };
        return InviteFriendsTab;
      }(BaseTabPage), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InviteListTab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './NGame.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts', './BaseTabPage.ts', './ShareSearchDataView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, instantiate, inject, NGame, HttpPbFunc, isResponseValid, pbfixReferralPlayerStatus, Utils, BaseTabPage, ShareSearchDataView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixReferralPlayerStatus = module.pbfixReferralPlayerStatus;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      ShareSearchDataView = module.ShareSearchDataView;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "5f947EnNblAH6APX3JXVF3T", "InviteListTab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var InviteListTab = exports('InviteListTab', (_dec = ccclass('InviteListTab'), _dec2 = inject("searchView", ShareSearchDataView), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(InviteListTab, _BaseTabPage);
        function InviteListTab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "searchView", _descriptor, _assertThisInitialized(_this));
          _this.dataTitles = ["Nick Name".i18nStr(), "Time".i18nStr(), "Status".i18nStr()];
          _this.catTypes = [{
            type: "All".i18nStr(),
            dataTitles: _this.dataTitles
          }, {
            type: "Valid".i18nStr(),
            dataTitles: _this.dataTitles
          }, {
            type: "Invalid".i18nStr(),
            dataTitles: _this.dataTitles
          }];
          _this.curCatIndex = 0;
          _this.startDate = "";
          _this.endDate = "";
          _this.inviteDataList = [];
          return _this;
        }
        var _proto = InviteListTab.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onEnable = function onEnable() {
          if (this.startDate.length > 0 && this.endDate.length > 0) {
            this.onQryData(1, this.startDate, this.endDate);
          }
        };
        _proto.open = function open() {
          var _this2 = this;
          this.searchView.initView(Utils.extractPropertyValues(this.catTypes, "type"), this.onQryData.bind(this), this.onCatTypeClicked.bind(this));
          this.searchView.totalNode.active = false;
          this.searchView.setCurCatData(this.curCatData.type, this.curCatData.dataTitles);
          this.searchView.listView.renderItemFn = function (item, index) {
            var elNode = item.child("bg");
            if (elNode.children.length != _this2.curCatData.dataTitles.length) {
              var nodeTextCount = elNode.children.length;
              var valueCount = _this2.curCatData.dataTitles.length;
              var addItem = function addItem() {
                var valueItem = instantiate(item.child("valueItem"));
                valueItem.active = true;
                elNode.addChild(valueItem);
              };
              var addCount = valueCount - nodeTextCount;
              if (nodeTextCount > valueCount) {
                addCount = valueCount;
                elNode.removeAllChildren();
              }
              for (var i = 0; i < addCount; i++) {
                addItem();
              }
            }
            var data = _this2.inviteDataList[index];
            if (data) {
              var _elNode$children$, _elNode$children$2, _elNode$children$3;
              (_elNode$children$ = elNode.children[0]) == null || _elNode$children$.setText(data.pbfixNick.ellipsis(8, false));
              (_elNode$children$2 = elNode.children[1]) == null || _elNode$children$2.setText(Utils.formatTime(data.pbfixReferredRegTime, "YYYY-MM-DD HH:mm:ss"));
              var statusStr = "Invalid".i18nStr();
              if (data.pbfixReferralStatus == 2) {
                statusStr = "Valid".i18nStr();
              }
              (_elNode$children$3 = elNode.children[2]) == null || _elNode$children$3.setText(statusStr);
            }
          };
          this.searchView.qryToday();
        };
        _proto.onQryData = function onQryData(curPage, startDate, endDate) {
          var _this3 = this;
          this.startDate = startDate;
          this.endDate = endDate;
          NGame.loading.show(null, null, false);
          this.searchView.nodata.active = false;
          this.searchView.listView.node.active = false;
          var onQryError = function onQryError() {
            _this3.searchView.showNoDataState();
            NGame.tips.toast("Data_Error".i18nStr());
          };
          HttpPbFunc.pbfixReferralInviteListReq(this.node, startDate, endDate, curPage, 20, function (result) {
            var _data$pbfixInviteList, _data$pbfixInviteList2, _data$pbfixInviteList3, _data$pbfixInviteList4, _data$pbfixInviteList5;
            NGame.loading.hide();
            if (isResponseValid(result)) {
              var _data$pbfixTotalSize;
              var data = result;
              switch (_this3.curCatIndex) {
                case 0:
                  // 全部
                  _this3.inviteDataList = (_data$pbfixInviteList = data.pbfixInviteList) != null ? _data$pbfixInviteList : [];
                  break;
                case 1:
                  // 有效邀请
                  _this3.inviteDataList = (_data$pbfixInviteList2 = (_data$pbfixInviteList3 = data.pbfixInviteList) == null ? void 0 : _data$pbfixInviteList3.filter(function (item) {
                    return item.pbfixReferralStatus == pbfixReferralPlayerStatus.pbfixREFERRAL_PLAYER_STATUS_VALID;
                  })) != null ? _data$pbfixInviteList2 : [];
                  break;
                case 2:
                  // 无效邀请
                  _this3.inviteDataList = (_data$pbfixInviteList4 = (_data$pbfixInviteList5 = data.pbfixInviteList) == null ? void 0 : _data$pbfixInviteList5.filter(function (item) {
                    return item.pbfixReferralStatus == pbfixReferralPlayerStatus.pbfixREFERRAL_PLAYER_STATUS_INVALID;
                  })) != null ? _data$pbfixInviteList4 : [];
                  break;
                default:
                  _this3.inviteDataList = [];
                  break;
              }
              _this3.onQryDataFinifshed(_this3.inviteDataList, (_data$pbfixTotalSize = data.pbfixTotalSize) != null ? _data$pbfixTotalSize : 0);
            } else {
              onQryError();
            }
          });
        };
        _proto.onQryDataFinifshed = function onQryDataFinifshed(dataList, totalSize) {
          if (dataList.length > 0) {
            this.searchView.listView.node.active = true;
            this.searchView.listView.refreshList(dataList);
            this.searchView.updateButtomBtnsState(totalSize);
          } else {
            this.searchView.showNoDataState();
          }
        };
        _proto.onCatTypeClicked = function onCatTypeClicked(catIndex) {
          if (this.curCatIndex != catIndex) {
            this.curCatIndex = catIndex;
            this.searchView.setCurCatData(this.curCatData.type, this.curCatData.dataTitles);
            this.onQryData(1, this.startDate, this.endDate);
          }
        };
        _createClass(InviteListTab, [{
          key: "curCatData",
          get: function get() {
            return this.catTypes[this.curCatIndex];
          }
        }]);
        return InviteListTab;
      }(BaseTabPage), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JackPotBonusNum.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKStaticViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, UITransform, instantiate, Label, tween, Vec3, EventName, MKStaticViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "8d075jh/FpJCYA5N36v370+", "JackPotBonusNum", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var JackPotBonusNum = exports('JackPotBonusNum', (_dec = ccclass('JackPotBonusNum'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(JackPotBonusNum, _MKStaticViewBase);
        function JackPotBonusNum() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "reelContainer", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ReelPrefab", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "symbolPrefab", _descriptor3, _assertThisInitialized(_this));
          //
          _initializerDefineProperty(_this, "isInit", _descriptor4, _assertThisInitialized(_this));
          // 数字位节点数组 (1-10)
          _this.digitNodes = [];
          // 当前显示的数字
          _this.currentNumber = "0";
          // 动画持续时间
          _this.ANIMATION_DURATION = 1.5;
          // 每个数字位的动画延迟
          _this.DIGIT_DELAY = 0.1;
          // 目标数字
          _this.targetNumber = "0";
          // 轮询定时器
          _this.pollingTimer = null;
          // 累计奖金池金额
          _this.accumulatedAmount = 0;
          // 是否已经初始化过数据
          _this.hasInitialized = false;
          // 初始时间戳（用于计算时间增长）
          _this.initialTimestamp = 0;
          // Game configuration
          _this.REELS = 11;
          // 7列
          _this.ROWS = 1;
          // 1行
          _this.SYMBOL_HEIGHT = 100;
          //方块高度 间距
          _this.SPIN_DURATION = 2.0;
          _this.REEL_DELAY = 0.2;
          _this.REELS_WIDTH = 35;
          //间距
          // Game state
          _this.reels = [];
          _this.symbols = [];
          _this.isSpinning = false;
          _this.finalResult = "";
          _this.isDisplayNumber = false;
          return _this;
        }
        var _proto = JackPotBonusNum.prototype;
        // 最终结果
        _proto.start = function start() {
          this.initEvent();
          this.initGame();
          // console.log("JackPotBonusNumPrefab start");

          // 启动轮询更新
          // this.startPolling();

          // this.initDisplayNumber("00027812.38");

          // this.scheduleOnce(()=>{
          // this.scrollToNumber("88027812.38");
          // 方式1: 普通滚动（所有列都转动）
          // this.scrollToNumber("88027812.38");

          // 方式2: 小数点不转动（第9列保持静止）
          // this.scrollToNumberWithStaticDecimal("88027812.38");

          // 方式3: 相同数字保持静止（智能跳过相同列）
          // this.scrollToNumberWithSameDigitStatic("88097122.21");

          // 方式4: 直接显示（无动画）
          // this.initDisplayNumber("88027812.38");

          // },3)

          if (this.isInit) {
            this.startPolling();
          }
        };
        _proto.update = function update(deltaTime) {};
        _proto.onDestroy = function onDestroy() {
          // 停止轮询更新
          this.stopPolling();
          this.isDisplayNumber = false;

          // console.log("jackbo  onDestroy==============================", this.isDisplayNumber);
        };

        _proto.initEvent = function initEvent() {
          if (!this.isInit) ;
        }

        /**
         * 开始轮询更新奖金池数据
         * 每3秒更新一次
         */;
        _proto.startPolling = function startPolling() {
          var _this2 = this;
          // console.log("开始轮询更新奖金池数据");

          // 清除现有定时器
          this.stopPolling();

          // 设置3秒轮询
          this.pollingTimer = setInterval(function () {
            _this2.updateJackpotBonusPool();
          }, 6000);

          // 立即执行一次
          this.updateJackpotBonusPool();
        }

        /**
         * 停止轮询更新
         */;
        _proto.stopPolling = function stopPolling() {
          if (this.pollingTimer) {
            clearInterval(this.pollingTimer);
            this.pollingTimer = null;
            // console.log("停止轮询更新奖金池数据");
          }
        }

        /**
         * 更新奖金池数据
         * 第一次调用接口获取数据，后续通过轮询模拟时间增长
         */;
        _proto.updateJackpotBonusPool = function updateJackpotBonusPool() {
          // console.log("轮询更新奖金池数据");

          if (!this.hasInitialized) {
            // 第一次启动，调用接口获取数据
            this.initializeFromServer();
          } else {
            // 后续轮询，模拟时间增长
            this.simulateTimeGrowth();
          }
        }

        /**
         * 从服务器初始化数据
         */;
        _proto.initializeFromServer = function initializeFromServer() {
          // console.log("第一次启动，从服务器获取数据");

          //获得服务器数据
          // ServerManager.getInstance().get_user_data((data: any) => {
          //     if(data){
          //         // console.log("get_user_data==", JSON.stringify(data));

          //         // 初始化累计金额
          //         this.accumulatedAmount = parseFloat(data.bonus_pool) || 0;
          //         this.initialTimestamp = data.timeStamp;
          //         this.hasInitialized = true;

          //         // console.log(`初始化累计金额: ${this.accumulatedAmount}`);
          //         // console.log(`初始时间戳: ${this.initialTimestamp}`);

          //         // 显示初始金额
          //         this.scrollToNumberWithSameDigitStatic(this.convertBonusPoolNumber(this.accumulatedAmount.toString()));

          //     }else{
          //         // console.log("get_user_data", data.message);
          //     }
          // });
        }

        /**
         * 模拟时间增长
         */;
        _proto.simulateTimeGrowth = function simulateTimeGrowth() {
          // 模拟时间增长（每次轮询增加6秒，因为轮询间隔是6秒）
          this.initialTimestamp += 6;

          // 创建模拟数据
          var mockData = {
            bonus_pool: this.accumulatedAmount.toString(),
            timeStamp: this.initialTimestamp
          };

          // 计算当前奖金池金额
          var calculatedAmount = this.calculateCurrentJackpotBonusPool(mockData);

          // 显示更新后的金额
          if (this.isInit) {
            this.scrollToNumberWithSameDigitStatic(calculatedAmount);
          }

          // console.log(`模拟时间增长，当前金额: ${calculatedAmount}`);
        };
        //刷新jackpot 奖金池数据
        _proto.refreshJackpotBonusPool = function refreshJackpotBonusPool(data) {
          // console.log("刷新jackpot 奖金池数据", data);

          // // 计算当前奖金池金额（包含时间增长）
          // const calculatedAmount = this.calculateCurrentJackpotBonusPool(data);

          // // 显示计算后的金额
          // this.scrollToNumberWithSameDigitStatic(calculatedAmount);

          // this.startPolling();

          if (!this.isInit) {
            // console.log("jackbo   ==============================", JSON.stringify(data));

            if (this.isDisplayNumber) {
              //滚动到目标数字
              this.scrollToNumberWithSameDigitStatic(data.bonus_pool);
            } else {
              //初始化显示数字
              this.initDisplayNumber(data.bonus_pool);
            }
          }
        }

        //计算当前jackpot 奖金池数据
        ;

        _proto.calculateCurrentJackpotBonusPool = function calculateCurrentJackpotBonusPool(data) {
          // console.log("计算当前jackpot 奖金池数据", data);

          // 当前时间戳（秒），需要转换为毫秒
          var currentTimestamp = data.timeStamp * 1000;

          // 获取当天0点的时间戳（基于传入的时间戳）
          var todayStart = this.getTodayStartTimestamp(currentTimestamp);

          // 计算从当天0点到现在的时长（秒）
          var elapsedSeconds = Math.floor((currentTimestamp - todayStart) / 1000);

          // console.log(`=== 奖金池计算详情 ===`);
          // console.log(`累计金额: ${this.accumulatedAmount}`);
          // console.log(`原始时间戳(秒): ${data.timeStamp}`);
          // console.log(`转换后时间戳(毫秒): ${currentTimestamp}`);
          // console.log(`传入时间: ${new Date(currentTimestamp).toLocaleString()}`);
          // console.log(`该日期0点时间戳: ${todayStart}`);
          // console.log(`该日期0点时间: ${new Date(todayStart).toLocaleString()}`);
          // console.log(`时间差(毫秒): ${currentTimestamp - todayStart}`);
          // console.log(`已过去秒数: ${elapsedSeconds}`);
          // console.log(`已过去小时: ${Math.floor(elapsedSeconds / 3600)}`);
          // console.log(`已过去分钟: ${Math.floor((elapsedSeconds % 3600) / 60)}`);
          // console.log(`已过去秒数(剩余): ${elapsedSeconds % 60}`);
          // console.log(`========================`);

          // 计算增长金额
          var growthAmount = this.calculateGrowthAmount(elapsedSeconds);

          // 累计金额 = 当前累计金额 + 增长金额
          this.accumulatedAmount += growthAmount;

          // console.log(`增长金额: ${growthAmount}`);
          // console.log(`新的累计金额: ${this.accumulatedAmount}`);

          // 格式化并返回
          var formattedAmount = this.convertBonusPoolNumber(this.accumulatedAmount.toString());
          return formattedAmount;
        }

        /**
         * 获取传入时间戳所在日期的0点时间戳
         * @param timestamp 传入的时间戳（毫秒）
         * @returns 该日期0点的时间戳（毫秒）
         */;
        _proto.getTodayStartTimestamp = function getTodayStartTimestamp(timestamp) {
          var date = new Date(timestamp);

          // 获取该日期的年月日
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();

          // 创建该日期的0点时间戳
          var dayStart = new Date(year, month, day, 0, 0, 0, 0);
          return dayStart.getTime();
        }

        /**
         * 计算增长金额
         * 根据已过去秒数的最后一位数字计算不同的增长值
         * @param elapsedSeconds 已过去的秒数
         * @returns 增长金额
         */;
        _proto.calculateGrowthAmount = function calculateGrowthAmount(elapsedSeconds) {
          // 获取秒数的最后一位数字
          var lastDigit = elapsedSeconds % 10;

          // 根据最后一位数字计算增长数：(x + 0.05) * x
          var growthAmount = (lastDigit + 0.05) * lastDigit;

          // 总增长 = 基础增长 + 增长数
          var totalGrowth = growthAmount;

          // console.log(`秒数: ${elapsedSeconds}, 最后一位: ${lastDigit}, 增长数: ${growthAmount}, 基础增长: ${baseGrowth}, 总增长: ${totalGrowth}`);

          return Math.max(0, totalGrowth); // 确保不为负数
        }

        /**
         * 获取确定性变化量
         * 使用伪随机算法，但基于种子确保相同输入产生相同输出
         * @param seed 种子值
         * @param elapsedSeconds 已过去的秒数
         * @returns 变化量
         */;
        _proto.getDeterministicVariation = function getDeterministicVariation(seed, elapsedSeconds) {
          // 简单的线性同余生成器，确保确定性
          var a = 1664525;
          var c = 1013904223;
          var m = Math.pow(2, 32);

          // 使用种子和时间戳计算伪随机数
          var randomValue = (a * seed + c) % m;
          randomValue = (a * randomValue + elapsedSeconds) % m;

          // 将随机数转换为 -1 到 1 之间的值
          var normalizedValue = randomValue / m * 2 - 1;
          return normalizedValue;
        }

        //转换数字 10位数字   例如 12345678.91
        ;

        _proto.convertBonusPoolNumber = function convertBonusPoolNumber(number) {
          // 移除所有非数字和小数点的字符
          var cleanNumber = number.replace(/[^\d.]/g, '');

          // 确保只有一个小数点
          var parts = cleanNumber.split('.');
          if (parts.length > 2) {
            cleanNumber = parts[0] + '.' + parts.slice(1).join('');
          }
          var integerPart = parts[0] || '0';
          var decimalPart = parts[1] || '';

          // console.log(`原始数字: ${number}`);
          // console.log(`清理后: ${cleanNumber}`);
          // console.log(`整数部分: ${integerPart}, 小数部分: ${decimalPart}`);

          // 格式化：整数部分8位，小数部分2位
          var formattedInteger = this.padString(integerPart, 8, '0'); // 整数部分补齐到8位
          var formattedDecimal = decimalPart.substring(0, 2); // 取前2位小数
          formattedDecimal = this.padString(formattedDecimal, 2, '0'); // 小数部分补齐到2位

          var result = formattedInteger + '.' + formattedDecimal;
          // console.log(`转换结果: ${result}`);

          return result;
        }

        // 初始化游戏
        ;

        _proto.initGame = function initGame() {
          // console.log("初始化游戏");

          // 确保轮盘容器锚点居中
          var containerTransform = this.reelContainer.getComponent(UITransform);
          if (containerTransform) {
            containerTransform.setAnchorPoint(0.5, 0.5);
          }
          this.createReels();
          this.showQuestionMarks();
        }

        // 创建轮盘
        ;

        _proto.createReels = function createReels() {
          for (var i = 0; i < this.REELS; i++) {
            var reel = this.createReel(i);
            this.reels.push(reel);
            this.symbols[i] = [];
          }
        }

        // 创建单个轮盘
        ;

        _proto.createReel = function createReel(index) {
          var reel = instantiate(this.ReelPrefab);
          reel.name = "Reel_" + index;
          reel.setParent(this.reelContainer);

          // 计算轮盘位置 - 从中心开始排列
          var totalWidth = (this.REELS - 1) * this.REELS_WIDTH;
          var startX = -totalWidth / 2;
          var x = startX + index * this.REELS_WIDTH;
          reel.setPosition(x, 0, 0);

          // console.log(`创建轮盘 ${index}，位置: (${x}, 0, 0)，总宽度: ${totalWidth}`);

          return reel;
        }

        // 显示问号
        ;

        _proto.showQuestionMarks = function showQuestionMarks() {
          for (var i = 0; i < this.REELS; i++) {
            var symbol = this.createSymbol("?");
            if (symbol == null) {
              return;
            }
            symbol.setParent(this.reels[i]);
            symbol.setPosition(0, 0, 0);
            this.symbols[i].push(symbol);
            // console.log(`轮盘 ${i} 显示问号，位置: (0, 0, 0)`);
          }
          // console.log("所有问号显示完成");
        }

        // 创建符号
        ;

        _proto.createSymbol = function createSymbol(text) {
          if (this.symbolPrefab) {
            var symbol = instantiate(this.symbolPrefab);
            symbol.name = "Symbol";

            // 查找并设置Label组件
            var label = symbol.getChildByName("Label").getComponent(Label);
            label.string = text;
            label.fontSize = 60;
            // label.color = new Color(255, 234, 0, 255); // 白色文字

            return symbol;
          } else {
            return null;
          }
        }

        // 开始旋转
        ;

        _proto.startSpin = function startSpin() {
          if (this.isSpinning) return;

          // 生成最终结果
          this.generateFinalResult();

          // 开始逐列旋转
          this.spinReelsSequentially();
        }

        // 生成最终结果
        ;

        _proto.generateFinalResult = function generateFinalResult() {
          this.finalResult = "";
          for (var i = 0; i < this.REELS; i++) {
            this.finalResult += Math.floor(Math.random() * 10).toString();
          }
          // console.log("最终结果:", this.finalResult);
        }

        // 逐列旋转
        ;

        _proto.spinReelsSequentially = function spinReelsSequentially() {
          var _this3 = this;
          var _loop = function _loop(i) {
            setTimeout(function () {
              _this3.spinReel(i);
            }, i * _this3.REEL_DELAY * 1000);
          };
          for (var i = 0; i < this.REELS; i++) {
            _loop(i);
          }
        }

        // 旋转单个轮盘
        ;

        _proto.spinReel = function spinReel(reelIndex) {
          var reel = this.reels[reelIndex];
          var finalDigit = this.finalResult[reelIndex];

          // 清除现有符号
          this.clearReel(reelIndex);

          // 创建滚动效果
          this.createSpinningEffect(reelIndex, finalDigit);
        }

        // 清除轮盘
        ;

        _proto.clearReel = function clearReel(reelIndex) {
          if (this.symbols) {
            var symbols = this.symbols[reelIndex];
            symbols.forEach(function (symbol) {
              if (symbol && symbol.isValid) {
                symbol.destroy();
              }
            });
            this.symbols[reelIndex] = [];
          }
        }

        // 创建滚动效果
        ;

        _proto.createSpinningEffect = function createSpinningEffect(reelIndex, finalDigit) {
          var _this4 = this;
          var reel = this.reels[reelIndex];

          // 清除现有符号
          this.clearReel(reelIndex);

          // 创建滚动容器
          var scrollContainer = new Node("ScrollContainer");
          scrollContainer.setParent(reel);
          scrollContainer.setPosition(0, 0, 0);
          for (var i = 0; i < 20; i++) {
            var digit = Math.floor(Math.random() * 10).toString();
            var symbol = this.createSymbol(digit);
            if (symbol == null) {
              return;
            }
            symbol.setParent(scrollContainer);
            symbol.setPosition(0, i * this.SYMBOL_HEIGHT, 0);
          }

          // 添加最终数字
          var finalSymbol = this.createSymbol(finalDigit);
          finalSymbol.setParent(scrollContainer);
          finalSymbol.setPosition(0, 20 * this.SYMBOL_HEIGHT, 0);

          // 滚动动画 - 移动滚动容器
          var targetY = -20 * this.SYMBOL_HEIGHT;

          // console.log(`轮盘 ${reelIndex} 开始滚动，目标位置: ${targetY}`);

          tween(scrollContainer).to(this.SPIN_DURATION, {
            position: new Vec3(0, targetY, 0)
          }).call(function () {
            // 动画结束后清理
            _this4.finishReelSpin(reelIndex, finalDigit);
          }).bindNodeState(false).start();
        }

        // 完成轮盘旋转
        ;

        _proto.finishReelSpin = function finishReelSpin(reelIndex, finalDigit) {
          var reel = this.reels[reelIndex];

          // 清理所有符号
          reel.children.forEach(function (child) {
            return child.destroy();
          });

          // 显示最终结果在轮盘中心
          var finalSymbol = this.createSymbol(finalDigit);
          if (finalSymbol == null) {
            return;
          }
          finalSymbol.setParent(reel);
          finalSymbol.setPosition(0, 0, 0);
          this.symbols[reelIndex] = [finalSymbol];

          // console.log(`轮盘 ${reelIndex} 完成，显示数字: ${finalDigit}`);

          // 检查是否所有轮盘都完成
          if (reelIndex === this.REELS - 1) {
            this.onAllReelsFinished();
          }
        }

        // 旋转单个轮盘（带回调）
        ;

        _proto.spinReelWithCallback = function spinReelWithCallback(reelIndex, callback) {
          if (!this.reels) {
            return;
          }
          var reel = this.reels[reelIndex];
          var finalDigit = this.finalResult[reelIndex];

          // 清除现有符号
          this.clearReel(reelIndex);

          // 创建滚动效果
          this.createSpinningEffectWithCallback(reelIndex, finalDigit, callback);
        }

        // 创建滚动效果（带回调）
        ;

        _proto.createSpinningEffectWithCallback = function createSpinningEffectWithCallback(reelIndex, finalDigit, callback) {
          var _this5 = this;
          var reel = this.reels[reelIndex];

          // 清除现有符号
          this.clearReel(reelIndex);

          // 创建滚动容器
          var scrollContainer = new Node("ScrollContainer");
          scrollContainer.setParent(reel);
          scrollContainer.setPosition(0, 0, 0);
          for (var i = 0; i < 20; i++) {
            var digit = Math.floor(Math.random() * 10).toString();
            var symbol = this.createSymbol(digit);
            if (symbol == null) {
              return;
            }
            symbol.setParent(scrollContainer);
            symbol.setPosition(0, i * this.SYMBOL_HEIGHT, 0);
          }

          // 添加最终数字
          var finalSymbol = this.createSymbol(finalDigit);
          if (finalSymbol == null) {
            return;
          }
          finalSymbol.setParent(scrollContainer);
          finalSymbol.setPosition(0, 20 * this.SYMBOL_HEIGHT, 0);

          // 滚动动画 - 移动滚动容器
          var targetY = -20 * this.SYMBOL_HEIGHT;

          // console.log(`轮盘 ${reelIndex} 开始滚动，目标位置: ${targetY}`);

          tween(scrollContainer).to(this.SPIN_DURATION, {
            position: new Vec3(0, targetY, 0)
          }).call(function () {
            // 动画结束后清理
            _this5.finishReelSpinWithCallback(reelIndex, finalDigit, callback);
          }).bindNodeState(false).start();
        }

        // 完成轮盘旋转（带回调）
        ;

        _proto.finishReelSpinWithCallback = function finishReelSpinWithCallback(reelIndex, finalDigit, callback) {
          var reel = this.reels[reelIndex];

          // 清理所有符号
          reel.children.forEach(function (child) {
            return child.destroy();
          });

          // 显示最终结果在轮盘中心
          var finalSymbol = this.createSymbol(finalDigit);
          if (finalSymbol == null) {
            return;
          }
          finalSymbol.setParent(reel);
          finalSymbol.setPosition(0, 0, 0);
          this.symbols[reelIndex] = [finalSymbol];

          // console.log(`轮盘 ${reelIndex} 完成，显示数字: ${finalDigit}`);

          // 调用回调函数
          callback();
        }

        // 所有轮盘完成
        ;

        _proto.onAllReelsFinished = function onAllReelsFinished() {
          this.isSpinning = false;
          // console.log("游戏结束，最终结果:", this.finalResult);
        }

        /**
         * 滚动到指定数字
         * @param targetNumber 目标数字，如 "88027812.38"
         */;
        _proto.scrollToNumber = function scrollToNumber(targetNumber) {
          if (this.isSpinning) {
            // console.log("正在旋转中，无法设置新数字");
            return;
          }

          // 格式化数字，确保有足够的位数
          this.targetNumber = this.formatNumber(targetNumber);
          // console.log("设置目标数字:", this.targetNumber);

          // 开始滚动到目标数字
          this.startSpinToTarget();
        }

        /**
         * 滚动到指定数字（小数点不转动）
         * @param targetNumber 目标数字，如 "88027812.38"
         */;
        _proto.scrollToNumberWithStaticDecimal = function scrollToNumberWithStaticDecimal(targetNumber) {
          if (this.isSpinning) {
            // console.log("正在旋转中，无法设置新数字");
            return;
          }

          // 格式化数字，确保有足够的位数
          this.targetNumber = this.formatNumber(targetNumber);
          // console.log("设置目标数字（小数点不转动）:", this.targetNumber);

          // 开始滚动到目标数字，跳过小数点列
          this.startSpinToTargetWithStaticDecimal();
        }

        /**
         * 滚动到指定数字（相同数字保持静止）
         * @param targetNumber 目标数字，如 "88027812.38"
         */;
        _proto.scrollToNumberWithSameDigitStatic = function scrollToNumberWithSameDigitStatic(targetNumber) {
          // 格式化数字，确保有足够的位数
          this.targetNumber = this.formatNumber(targetNumber);
          // console.log("设置目标数字（相同数字保持静止）:", this.targetNumber);

          if (this.isInit) {
            // console.log("jackbo  111111==============================", this.targetNumber);
            global.emit(EventName.REFRESH_JACKPOT_BONUS_POOL, {
              bonus_pool: this.targetNumber
            });
          }
          if (this.isSpinning) {
            // console.log("正在旋转中，无法设置新数字");
            return;
          }

          // 开始滚动到目标数字，跳过相同数字列
          this.startSpinToTargetWithSameDigitStatic();
        }

        /**
         * 初始化显示数字（不带动画）
         * @param number 要显示的数字
         */;
        _proto.initDisplayNumber = function initDisplayNumber(number) {
          if (this.isSpinning) {
            // console.log("正在旋转中，无法初始化显示");
            return;
          }

          // 格式化数字
          var formattedNumber = this.formatNumber(number);
          // console.log("初始化显示数字:", formattedNumber);

          // 清除所有轮盘
          for (var i = 0; i < this.REELS; i++) {
            this.clearReel(i);
          }

          //直接显示过后 设置为true
          this.isDisplayNumber = true;

          // 直接显示目标数字
          this.displayFinalNumber(formattedNumber);
        }

        /**
         * 格式化数字，确保有足够的位数
         * @param number 输入的数字字符串
         * @returns 格式化后的数字字符串
         */;
        _proto.formatNumber = function formatNumber(number) {
          // 移除所有非数字和小数点的字符
          var cleanNumber = number.replace(/[^\d.]/g, '');

          // 确保只有一个小数点
          var parts = cleanNumber.split('.');
          if (parts.length > 2) {
            cleanNumber = parts[0] + '.' + parts.slice(1).join('');
          }
          var integerPart = parts[0] || '0';
          var decimalPart = parts[1] || '';

          // console.log(`原始数字: ${number}`);
          // console.log(`清理后: ${cleanNumber}`);
          // console.log(`整数部分: ${integerPart}, 小数部分: ${decimalPart}`);

          // 如果有小数点，需要特殊处理
          if (decimalPart) {
            // 对于 "88027812.38"，我们希望显示为 "88027812.38"
            // 整数部分：88027812 (8位)
            // 小数点：1位
            // 小数部分：38 (2位)
            // 总共：8 + 1 + 2 = 11位，正好等于REELS

            // 如果总长度超过REELS，需要截断
            var fullNumber = integerPart + '.' + decimalPart;
            if (fullNumber.length > this.REELS) {
              fullNumber = fullNumber.substring(0, this.REELS);
            }

            // 如果总长度不足REELS，需要补零
            if (fullNumber.length < this.REELS) {
              // 在整数部分前面补零
              var currentIntegerLength = integerPart.length;
              var neededLength = this.REELS - 1 - decimalPart.length; // 总长度 - 小数部分长度 - 小数点
              var paddedInteger = this.padString(integerPart, neededLength, '0');
              fullNumber = paddedInteger + '.' + decimalPart;
            }

            // console.log(`格式化结果: ${fullNumber}`);
            return fullNumber;
          } else {
            // 没有小数点，直接补零到REELS位数
            var _paddedInteger = this.padString(integerPart, this.REELS, '0');
            // console.log(`无小数点格式化结果: ${paddedInteger}`);
            return _paddedInteger;
          }
        }

        /**
         * 开始滚动到目标数字
         */;
        _proto.startSpinToTarget = function startSpinToTarget() {
          this.isSpinning = true;
          this.finalResult = this.targetNumber;
          // console.log("开始滚动到目标数字:", this.finalResult);

          // 开始逐列旋转
          this.spinReelsSequentially();
        }

        /**
         * 开始滚动到目标数字（小数点不转动）
         */;
        _proto.startSpinToTargetWithStaticDecimal = function startSpinToTargetWithStaticDecimal() {
          this.isSpinning = true;
          this.finalResult = this.targetNumber;
          // console.log("开始滚动到目标数字（小数点不转动）:", this.finalResult);

          // 先设置小数点列显示
          this.setStaticDecimal();

          // 开始逐列旋转，跳过小数点列
          this.spinReelsSequentiallyWithStaticDecimal();
        }

        /**
         * 设置静止的小数点
         */;
        _proto.setStaticDecimal = function setStaticDecimal() {
          var decimalIndex = 8; // 第9列，索引8
          if (decimalIndex < this.REELS) {
            // 清除小数点列
            this.clearReel(decimalIndex);

            // 直接显示小数点
            var decimalSymbol = this.createSymbol('.');
            if (decimalSymbol == null) {
              return;
            }
            decimalSymbol.setParent(this.reels[decimalIndex]);
            decimalSymbol.setPosition(0, 0, 0);
            this.symbols[decimalIndex] = [decimalSymbol];

            // console.log(`设置静止小数点在第${decimalIndex + 1}列`);
          }
        }

        /**
         * 逐列旋转（跳过小数点列）
         */;
        _proto.spinReelsSequentiallyWithStaticDecimal = function spinReelsSequentiallyWithStaticDecimal() {
          var _this6 = this;
          var _loop2 = function _loop2(i) {
            // 跳过小数点列（第9列，索引8）
            if (i === 8) {
              // console.log(`跳过小数点列 ${i}`);
              return 1; // continue
            }

            setTimeout(function () {
              _this6.spinReel(i);
            }, i * _this6.REEL_DELAY * 1000);
          };
          for (var i = 0; i < this.REELS; i++) {
            if (_loop2(i)) continue;
          }
        }

        /**
         * 开始滚动到目标数字（相同数字保持静止）
         */;
        _proto.startSpinToTargetWithSameDigitStatic = function startSpinToTargetWithSameDigitStatic() {
          this.isSpinning = true;
          this.finalResult = this.targetNumber;
          // console.log("开始滚动到目标数字（相同数字保持静止）:", this.finalResult);

          // 检查并设置相同数字列
          this.setSameDigitStatic();

          // 开始逐列旋转，跳过相同数字列
          this.spinReelsSequentiallyWithSameDigitStatic();
        }

        /**
         * 设置相同数字列为静止
         */;
        _proto.setSameDigitStatic = function setSameDigitStatic() {
          for (var i = 0; i < this.REELS; i++) {
            var currentDigit = this.getCurrentDigit(i);
            var targetDigit = this.finalResult[i];

            // console.log(`列 ${i}: 当前数字 "${currentDigit}", 目标数字 "${targetDigit}"`);

            // 如果当前数字和目标数字相同，设置为静止
            if (currentDigit === targetDigit) {
              // console.log(`列 ${i} 数字相同，设置为静止`);
              // 确保该列显示正确的数字
              this.clearReel(i);
              var symbol = this.createSymbol(targetDigit);
              if (symbol) {
                symbol.setParent(this.reels[i]);
                symbol.setPosition(0, 0, 0);
                this.symbols[i] = [symbol];
              }
            }
          }
        }

        /**
         * 获取指定列的当前数字
         * @param columnIndex 列索引
         * @returns 当前显示的数字字符
         */;
        _proto.getCurrentDigit = function getCurrentDigit(columnIndex) {
          // 检查列索引是否有效
          if (columnIndex < 0 || columnIndex >= this.REELS) {
            return '0';
          }

          // 检查symbols数组是否存在且该列有数据
          if (!this.symbols || !this.symbols[columnIndex] || this.symbols[columnIndex].length === 0) {
            return '0'; // 默认返回0
          }

          // 检查第一个符号是否存在且有效
          var symbol = this.symbols[columnIndex][0];
          if (!symbol || !symbol.isValid) {
            return '0';
          }

          // 获取Label组件
          var labelNode = symbol.getChildByName("Label");
          if (!labelNode) {
            return '0';
          }
          var label = labelNode.getComponent(Label);
          if (!label) {
            return '0';
          }
          return label.string || '0';
        }

        /**
         * 逐列旋转（跳过相同数字列）
         */;
        _proto.spinReelsSequentiallyWithSameDigitStatic = function spinReelsSequentiallyWithSameDigitStatic() {
          var _this7 = this;
          var spinningCount = 0; // 需要旋转的列数

          // 先计算需要旋转的列数
          for (var i = 0; i < this.REELS; i++) {
            var currentDigit = this.getCurrentDigit(i);
            var targetDigit = this.finalResult[i];
            if (currentDigit !== targetDigit) {
              spinningCount++;
            }
          }

          // console.log(`需要旋转的列数: ${spinningCount}`);

          // 如果没有需要旋转的列，直接完成
          if (spinningCount === 0) {
            this.onAllReelsFinished();
            return;
          }
          var completedCount = 0; // 已完成的旋转列数
          var _loop3 = function _loop3(_i) {
            var currentDigit = _this7.getCurrentDigit(_i);
            var targetDigit = _this7.finalResult[_i];

            // 跳过相同数字列
            if (currentDigit === targetDigit) {
              // console.log(`跳过相同数字列 ${i} (${currentDigit})`);
              return 1; // continue
            }

            setTimeout(function () {
              _this7.spinReelWithCallback(_i, function () {
                completedCount++;
                // console.log(`完成旋转列 ${i}, 已完成: ${completedCount}/${spinningCount}`);

                // 检查是否所有需要旋转的列都完成了
                if (completedCount >= spinningCount) {
                  _this7.onAllReelsFinished();
                }
              });
            }, _i * _this7.REEL_DELAY * 1000);
          };
          for (var _i = 0; _i < this.REELS; _i++) {
            if (_loop3(_i)) continue;
          }
        }

        /**
         * 直接显示最终数字（无动画）
         * @param number 要显示的数字
         */;
        _proto.displayFinalNumber = function displayFinalNumber(number) {
          for (var i = 0; i < this.REELS; i++) {
            var digit = number[i] || '0';
            var symbol = this.createSymbol(digit);
            if (symbol == null) {
              return;
            }
            symbol.setParent(this.reels[i]);
            symbol.setPosition(0, 0, 0);
            this.symbols[i] = [symbol];
            // console.log(`轮盘 ${i} 显示数字: ${digit}`);
          }
          // console.log("数字显示完成:", number);
        }

        /**
         * 字符串填充方法（兼容旧版本TypeScript）
         * @param str 要填充的字符串
         * @param length 目标长度
         * @param padChar 填充字符
         * @returns 填充后的字符串
         */;
        _proto.padString = function padString(str, length, padChar) {
          while (str.length < length) {
            str = padChar + str;
          }
          return str;
        };
        return JackPotBonusNum;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "reelContainer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ReelPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "symbolPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isInit", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LimitedTimeOffer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts', './RechargeRolling.ts', './LimitedTimeOfferItem.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, Label, instantiate, tween, Vec3, MKViewBase, NGame, gameDataMgr, HttpPbFunc, pbfixPaymentSource, PayUtils, safetyNum, Utils, RechargeRolling, LimitedTimeOfferItem, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Label = module.Label;
      instantiate = module.instantiate;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      RechargeRolling = module.RechargeRolling;
    }, function (module) {
      LimitedTimeOfferItem = module.LimitedTimeOfferItem;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "e4398umPV5BV6Mt/K0JXhv4", "LimitedTimeOffer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 限时特惠充值活动
       */
      var LimitedTimeOffer = exports('LimitedTimeOffer', (_dec = ccclass('LimitedTimeOffer'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Prefab
      }), _dec6 = property({
        type: Label
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Prefab
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(LimitedTimeOffer, _MKViewBase);
        function LimitedTimeOffer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtnNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titleNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "contentNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemPayPrefab", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomLabel", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomBtnNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "contentScollerNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomItemPrefab", _descriptor8, _assertThisInitialized(_this));
          _this.contentChildrens = [];
          _this.allMoney = [];
          _this.orderMoney = 0;
          // 充值金额
          _this.cardId = 0;
          return _this;
        }
        var _proto = LimitedTimeOffer.prototype;
        _proto.open = function open() {
          this.initLoadData();
        };
        _proto.initLoadData = function initLoadData() {
          var _this2 = this;
          this.allMoney = [];
          var data = gameDataMgr.payConf.pbfixLimitedTimePayConf;
          var limitDataArray = (data == null ? void 0 : data.pbfixShopList) || [];
          this.contentNode.removeAllChildren();
          if (limitDataArray.length > 0) {
            for (var i = 0; i < limitDataArray.length; i++) {
              var limitData = limitDataArray[i];
              var limitItem = instantiate(this.itemPayPrefab);
              limitItem.getComponent(LimitedTimeOfferItem).initD(limitData, i);
              if (i == 0) {
                this.orderMoney = limitData.pbfixPrice;
                this.cardId = limitData.pbfixId;
              }
              this.allMoney.push(safetyNum(limitData == null ? void 0 : limitData.pbfixPrice).cToRateNum());
              this.contentNode.addChild(limitItem);
            }
            this.contentChildrens = this.contentNode.children;
            for (var _i = 0; _i < this.contentChildrens.length; _i++) {
              this.contentChildrens[_i].getComponent(LimitedTimeOfferItem).onClick(function (data, pos) {
                _this2.updateSelectStatus(pos);
                _this2.orderMoney = data.pbfixPrice;
                _this2.cardId = data.pbfixId;
                _this2.updateBottomLabel();
              });
            }
            this.updateBottomLabel();
          }
          this.buttonClick();
          this.addData();
        };
        _proto.buttonClick = function buttonClick() {
          var _this3 = this;
          this.onClicked(this.bottomBtnNode, function () {
            _this3.payRechargeOrder(_this3.orderMoney, _this3.cardId);
          });
          this.onClicked(this.closeBtnNode, function () {
            _this3.close();
          });
        };
        _proto.addData = function addData() {
          if (this.allMoney.length > 0) {
            this.contentScollerNode.removeAllChildren();
            //随机一个姓名or金额
            this.schedule(this.updateUserData, 1.5);
          }
        };
        _proto.payRechargeOrder = function payRechargeOrder(price, activityId) {
          var _this4 = this;
          GoogleAnalytics.track(GAEvent.LIMIT_RECHARGE);
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_LIMITED_TIME_RECHARGE, price, activityId, function () {
            NGame.tips.toast("Payment successful".i18nStr());
            HttpPbFunc.pbfixActivityListReq(_this4.node, function () {
              _this4.closeAndDestroy();
            }, true);
          });
        };
        _proto.updateSelectStatus = function updateSelectStatus(pos) {
          for (var i = 0; i < this.contentChildrens.length; i++) {
            this.contentChildrens[i].getComponent(LimitedTimeOfferItem).updateStatus(pos == i);
          }
        };
        _proto.updateBottomLabel = function updateBottomLabel() {
          this.bottomLabel.string = "Deposit $ " + safetyNum(this.orderMoney).cToRateNum();
        }

        /**
         * 底部跑马灯：暂时用假数据
         */;
        _proto.updateUserData = function updateUserData() {
          var nametxt = Utils.setRandomDeposit();
          var money = this.allMoney[Math.floor(Math.random() * this.allMoney.length)];
          var bottomItem = instantiate(this.bottomItemPrefab);
          bottomItem.setPosition(0, -50, 0);
          bottomItem.getComponent(RechargeRolling).initD(nametxt, money);
          this.contentScollerNode.addChild(bottomItem);
          tween(bottomItem).to(0.5, {
            position: new Vec3(0, 0, 0)
          }, {
            easing: "quadOut"
          }).delay(0.5).to(0.5, {
            position: new Vec3(0, 50, 0)
          }, {
            easing: "quadOut"
          }).call(function () {
            if (bottomItem != null) {
              bottomItem.destroy();
            }
          }).start();
        };
        return LimitedTimeOffer;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtnNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contentNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "itemPayPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bottomLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bottomBtnNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "contentScollerNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bottomItemPrefab", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LimitedTimeOfferItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKStaticViewBase.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, SpriteFrame, Label, Node, RATE_FEE, MKStaticViewBase, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Node = module.Node;
    }, function (module) {
      RATE_FEE = module.RATE_FEE;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "d6848g8vrpImYtabh4a7mJZ", "LimitedTimeOfferItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 限时特惠充值活动item
       */
      var LimitedTimeOfferItem = exports('LimitedTimeOfferItem', (_dec = ccclass('LimitedTimeOfferItem'), _dec2 = property({
        type: Sprite
      }), _dec3 = property({
        type: [SpriteFrame]
      }), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Sprite
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Label
      }), _dec9 = property({
        type: Label
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(LimitedTimeOfferItem, _MKStaticViewBase);
        function LimitedTimeOfferItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "iconBgSprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goldIconSpriteFrames", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ratioLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goldIconSprite", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "selBgNode", _descriptor5, _assertThisInitialized(_this));
          // 选中
          _initializerDefineProperty(_this, "recommandTagNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "getValueLabel", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "priceLabel", _descriptor8, _assertThisInitialized(_this));
          _this.data = null;
          _this.pos = 0;
          return _this;
        }
        var _proto = LimitedTimeOfferItem.prototype;
        _proto.initD = function initD(data, pos) {
          this.data = data;
          this.pos = pos;
          this.ratioLabel.string = "+" + safetyNum(data == null ? void 0 : data.pbfixGiftRatio).cToFeeRateNum() + "%";
          this.priceLabel.string = "$ " + safetyNum(data == null ? void 0 : data.pbfixPrice).cToRateNum();
          this.getValueLabel.string = "GET".i18nStr() + (safetyNum(data == null ? void 0 : data.pbfixPrice).cToRateNum() * (1 + safetyNum(data == null ? void 0 : data.pbfixGiftRatio).cToRateNum() / RATE_FEE)).toFixed(2);
          this.selBgNode.active = pos == 0;
          var iconIndex = Math.max(pos, this.goldIconSpriteFrames.length - 1);
          this.goldIconSprite.spriteFrame = this.goldIconSpriteFrames[iconIndex];

          // if (data.is_hot == 1) {
          //     this.recommandTagNode.active = true
          // } else {
          //     this.recommandTagNode.active = false
          // }
        };

        _proto.updateStatus = function updateStatus(flag) {
          this.selBgNode.active = flag;
        };
        _proto.onClick = function onClick(callBack) {
          var _this2 = this;
          this.onClicked(this.node, function () {
            if (callBack != null) {
              callBack(_this2.data, _this2.pos);
            }
          });
        };
        return LimitedTimeOfferItem;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "iconBgSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "goldIconSpriteFrames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ratioLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "goldIconSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "selBgNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "recommandTagNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "getValueLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "priceLabel", [_dec9], {
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

System.register("chunks:///_virtual/NeedMorePlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './GameDataMgr.ts', './UIController.ts', './Utils.ts', './WebGameUtils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, MKViewBase, gameDataMgr, UIController, Utils, WebGameUtils;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      WebGameUtils = module.WebGameUtils;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "74ec4cTTx9Gk5nBey81j8ig", "NeedMorePlay", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NeedMorePlay = exports('NeedMorePlay', (_dec = ccclass('NeedMorePlay'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(NeedMorePlay, _MKViewBase);
        function NeedMorePlay() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = NeedMorePlay.prototype;
        _proto.open = function open() {
          var _this$initData$needMo,
            _this$initData,
            _this$initData2,
            _this2 = this;
          var needMoreMoney = (_this$initData$needMo = (_this$initData = this.initData) == null ? void 0 : _this$initData.needMoreMoney) != null ? _this$initData$needMo : 0;
          var onGoPlay = (_this$initData2 = this.initData) == null ? void 0 : _this$initData2.onGoPlay;
          if (needMoreMoney > 0) {
            this.allNode = UIController.getAllChildrenMap(this.node);
            this.onClicked(this.allNode.closeBtn, function () {
              _this2.closeView();
            });
            this.onClicked(this.allNode.playBtn, function () {
              _this2.toPlayGame();
              onGoPlay == null || onGoPlay();
            });
            this.allNode.MoneyLb.setText("Need More".i18nStr([Utils.setCurrency(needMoreMoney == null ? void 0 : needMoreMoney.cToRateNum())]));
          } else {
            this.closeView();
          }
        };
        _proto.toPlayGame = function toPlayGame() {
          if (gameDataMgr.defaultGame) {
            var game = gameDataMgr.defaultGame;
            WebGameUtils.openWebGame(this.node, game.pbfixId, 1, game.pbfixOrientation);
          }
          this.closeView();
        };
        _proto.closeView = function closeView() {
          this.close();
        };
        return NeedMorePlay;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PayTypeItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './MKStaticViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, Tween, UIOpacity, Sprite, Toggle, Label, color, tween, inject, MKStaticViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      Tween = module.Tween;
      UIOpacity = module.UIOpacity;
      Sprite = module.Sprite;
      Toggle = module.Toggle;
      Label = module.Label;
      color = module.color;
      tween = module.tween;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "81877h0d+pKVrU/f2WfPcXK", "PayTypeItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PayTypeItem = exports('PayTypeItem', (_dec = ccclass('PayTypeItem'), _dec2 = inject("type_item", Node), _dec3 = inject("channelListView", Node), _dec4 = inject("channelItem", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(PayTypeItem, _MKStaticViewBase);
        function PayTypeItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          // static curPayTypeIdx = 0;
          // static curChannelIdx = 0;
          _initializerDefineProperty(_this, "typeItem", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "channelListView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "channelItem", _descriptor3, _assertThisInitialized(_this));
          _this.dataIdx = 0;
          _this.typeData = void 0;
          _this.onTypeClicked = void 0;
          _this.onChannelClicked = void 0;
          return _this;
        }
        var _proto = PayTypeItem.prototype;
        _proto.onLoad = function onLoad() {
          this.initView();
        };
        _proto.setData = function setData(typeData, dataIdx, onTypeClicked, onChannelClicked) {
          this.typeData = typeData;
          this.dataIdx = dataIdx;
          this.onTypeClicked = onTypeClicked;
          this.onChannelClicked = onChannelClicked;
        };
        _proto.initView = function initView() {
          var _this2 = this;
          if (!this.typeData) {
            this.node.removeFromParent();
            return;
          }
          this.typeItem.active = true;
          this.typeItem.child("Label_type").setText(this.typeData.typeName);
          this.typeItem.child("icon").loadUrlImg({
            url: this.typeData.typeIconUrl,
            target: this.node
          });
          this.onClicked(this.typeItem, function () {
            _this2.onTypeClicked == null || _this2.onTypeClicked(_this2.dataIdx);
          });
          this.channelListView.active = false;
          // for (let index = 0; index < 3; index++) {
          //     const channelItem = instantiate(this.channelItem)
          //     channelItem.active = true;
          //     channelItem.child(`channelName`).setText(this.payTypeData.pbfixChannelList[0].pbfixName)
          //     channelItem.parent = this.channelListView
          //     this.onClicked(channelItem, () => {
          //         PayTypeItem.curChannelIdx = index;
          //         this.onChannelSelected()
          //     }, false, 0.5, false)

          // }
          this.typeData.channels.forEach(function (channelName, idx) {
            var channelItem = instantiate(_this2.channelItem);
            channelItem.active = true;
            channelItem.child("channelName").setText(channelName);
            channelItem.parent = _this2.channelListView;
            _this2.onClicked(channelItem, function () {
              _this2.onChannelClicked == null || _this2.onChannelClicked(idx);
              _this2.updateChannelState(idx);
            }, false, 0.5, false);
          });
        };
        _proto.onNoSelect = function onNoSelect() {
          this.typeItem.child("icArrow").angle = -90;
          this.channelListView.active = false;
          this.channelListView.children.forEach(function (item) {
            Tween.stopAllByTarget(item);
            item.getComponent(UIOpacity).opacity = 0;
          });
          this.node.getComponent(Sprite).enabled = false;
          this.typeItem.getComponent(Sprite).enabled = true;
        };
        _proto.onSelected = function onSelected(selChannelIdx) {
          var _this3 = this;
          this.typeItem.child("icArrow").angle = 0;
          if (this.channelListView.children.length > 0) {
            this.channelListView.active = true;
            this.updateChannelState(selChannelIdx, true);
          }
          this.scheduleOnce(function () {
            _this3.node.getComponent(Sprite).enabled = true;
          });
          this.typeItem.getComponent(Sprite).enabled = false;
        };
        _proto.updateChannelState = function updateChannelState(selChannelIdx, showAnim) {
          if (showAnim === void 0) {
            showAnim = false;
          }
          this.channelListView.children.forEach(function (channelItem, idx) {
            var isSel = idx == selChannelIdx;
            channelItem.child("Toggle").getComponent(Toggle).isChecked = isSel;
            channelItem.child("channelName").getComponent(Label).color = color(isSel ? "#FFFFFF" : "#8B9AB7");
            channelItem.child("channelName").getComponent(Label).isBold = isSel;
            if (showAnim) {
              tween(channelItem.getComponent(UIOpacity)).to(0.3, {
                opacity: 255
              }).bindNodeState(false).start();
            }
          });
        };
        return PayTypeItem;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "typeItem", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "channelListView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "channelItem", [_dec4], {
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

System.register("chunks:///_virtual/PayTypePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameCfg.ts', './Constant.ts', './UIHelper.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './GamePermanent.ts', './UIController.ts', './HttpPbFunc.ts', './Utils.ts', './HowToPayDialog.ts', './PayTypeItem.ts', './GoogleAnatytics.ts', './PlatformUtils.ts', './PwaInstallHelper.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, sys, GameCfg, EventName, UIHelper, UIPath, MKViewBase, NGame, gameDataMgr, gamePermanent, UIController, HttpPbFunc, isResponseValid, Utils, HowToPayDialog, PayTypeItem, GoogleAnalytics, GAEvent, PlatformUtils, PwaInstallHelper;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      sys = module.sys;
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      gamePermanent = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      HowToPayDialog = module.HowToPayDialog;
    }, function (module) {
      PayTypeItem = module.PayTypeItem;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      PwaInstallHelper = module.PwaInstallHelper;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "94675iBbJVPA6JGskdrakBS", "PayTypePage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PayTypePage = exports('default', (_dec = ccclass('PayTypePage'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(PayTypePage, _MKViewBase);
        function PayTypePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.initData = null;
          _initializerDefineProperty(_this, "btnBack", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labPay", _descriptor2, _assertThisInitialized(_this));
          // 充值金额
          _initializerDefineProperty(_this, "payItemParent", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnPay", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnPayNo", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnsNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "helpPay", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PayTypeItem", _descriptor8, _assertThisInitialized(_this));
          /**充值id */
          _this.shopId = 0;
          /**支付类型 */
          // curPayTypeIdx: number = 0;
          /**充值数据 */
          _this.payTypeList = [];
          /**订单号 */
          _this.orderId = "";
          _this.curPayTypeIdx = 0;
          _this.curChannelIdx = 0;
          return _this;
        }
        var _proto = PayTypePage.prototype;
        _proto.onLoad = function onLoad() {};
        _proto.open = function open() {
          this.onMsg(EventName.RECHARGE_ORDER_SUCCESS, this.onOrderSuccess);
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
          this.onClicked(this.btnBack, this.closeAndDestroy.bind(this));
          this.onClicked(this.btnPay, this.clickPay.bind(this), false, 2.0);
          this.onClicked(this.helpPay, this.openHelpPay.bind(this));
          this.openView();
        };
        _proto.openHelpPay = function openHelpPay() {
          UIHelper.openUI(HowToPayDialog, UIPath.HowToPayDialog);
        };
        _proto.onDisable = function onDisable() {
          this.offMsg(EventName.RECHARGE_ORDER_SUCCESS, this.onOrderSuccess);
        };
        _proto.openView = function openView() {
          var _this$initData,
            _this2 = this;
          NGame.loading.show(null, null, false);
          HttpPbFunc.pbfixUserInfoReq(null, false, null);
          var amount = ((_this$initData = this.initData) == null ? void 0 : _this$initData.amount) || 0;
          HttpPbFunc.pbfixPayTypeListReq(this.node, amount, function (result) {
            if (isResponseValid(result)) {
              NGame.loading.hide();
              _this2.payTypeList = gameDataMgr.payTypeList;
              _this2.setView();
            }
          });
        };
        _proto.setView = function setView() {
          var _this$initData2,
            _this3 = this;
          var payStudyList = gameDataMgr.payConf.pbfixPayStudyList;
          this.helpPay.active = payStudyList.length > 0;
          this.shopId = this.initData.shopId;
          this.labPay.setText(Utils.setCurrency((_this$initData2 = this.initData) == null || (_this$initData2 = _this$initData2.amount) == null ? void 0 : _this$initData2.cToRateNum()));
          this.labPay.active = true;
          this.curPayTypeIdx = 0;
          this.curChannelIdx = 0;
          for (var i = 0; i < this.payTypeList.length; i++) {
            var item = instantiate(this.PayTypeItem);
            item.active = true;
            item.getComponent(PayTypeItem).setData(this.createTypeData(this.payTypeList[i]), i, function (typeIdx) {
              if (typeIdx != _this3.curPayTypeIdx) {
                _this3.curPayTypeIdx = typeIdx;
                _this3.curChannelIdx = 0;
                _this3.payItemParent.children.forEach(function (payItem, itemIdx) {
                  if (itemIdx == _this3.curPayTypeIdx) {
                    payItem.getComponent(PayTypeItem).onSelected(_this3.curChannelIdx);
                  } else {
                    payItem.getComponent(PayTypeItem).onNoSelect();
                  }
                });
                // NGame.tips.toast(`curPayTypeIdx = ${this.curPayTypeIdx}, curChannelIdx = ${this.curChannelIdx}`)
              }
            }, function (channelIdx) {
              _this3.curChannelIdx = channelIdx;
              // NGame.tips.toast(`curPayTypeIdx = ${this.curPayTypeIdx}, curChannelIdx = ${this.curChannelIdx}`)
            });

            this.payItemParent.addChild(item);
          }
          this.payItemParent.children[this.curPayTypeIdx].getComponent(PayTypeItem).onSelected(this.curChannelIdx);
          UIController.popUp(this.btnsNode);
        };
        _proto.onOrderSuccess = function onOrderSuccess() {
          var _this$initData$onSucc, _this$initData3;
          // `收到通知, 关闭PayTypePage`.logI(`asofiasbfu139r1b90`)
          (_this$initData$onSucc = (_this$initData3 = this.initData).onSuccess) == null || _this$initData$onSucc.call(_this$initData3);
          this.closeAndDestroy();
        }

        /**点击支付 */;
        _proto.clickPay = function clickPay() {
          var _channels$this$curCha,
            _this4 = this;
          GoogleAnalytics.track(GAEvent.CLICK_PAY_TYPE);
          // NGame.tips.toast(`curPayTypeIdx = ${this.curPayTypeIdx}, curChannelIdx = ${this.curChannelIdx}`)
          // return;
          // this.btnPay.getComponent(Button).interactable = false;
          // this.btnPayNo.active = true;
          var typeId = this.payTypeList[this.curPayTypeIdx].pbfixTypeId;
          var channels = this.payTypeList[this.curPayTypeIdx].pbfixChannelList || [];
          var channelId = ((_channels$this$curCha = channels[this.curChannelIdx]) == null ? void 0 : _channels$this$curCha.pbfixChannelId) || 0; // todo 需要动态获取

          var amount = this.initData.amount;
          var paymentSource = this.initData.paymentSource;
          var shopId = this.initData.shopId;
          NGame.loading.show();
          var newWindow = null;
          var isWebview = PlatformUtils.isWebview();
          var isIosPwaType = PwaInstallHelper.isIosPwaType();
          var openUrlInSystemBrowser = isWebview || isIosPwaType;
          if (GameCfg.isRelease && sys.isBrowser && !openUrlInSystemBrowser) {
            // webview一律引导跳转浏览器端
            // 先打开一个loading窗口（一定要是玩家操作后立刻打开），突破浏览器端 【用户触发同步】限制

            newWindow = window.open("https://" + GameCfg.domin + "/pay_html/pay_2.0.html", '_blank');

            // newWindow = window.open(`https://webtest.gingame.top/pay_html/pay_1.0.html`, '_blank'); 
            // newWindow = window.open(`http://192.168.2.99:8000/fortunespin/pay_html/pay_2.0.html`, '_blank');
            if (!newWindow) {
              NGame.tips.toast("Pay_Error".i18nStr());
              newWindow = null;
              return;
            }
          }
          HttpPbFunc.pbfixPayReq(this.node, paymentSource, amount, shopId, typeId, channelId, function (result) {
            NGame.loading.hide();
            if (isResponseValid(result)) {
              var data = result;
              _this4.orderId = data.pbfixOrderId;

              // WebviewUtil.showWebview(data.pbfixPayUrl, OrientationType.ORIENTATION_PORTRAIT, WebPageType.PAGE_LIVE_CHAT, false)

              // 必须在一个新的窗口打开支付页面，实现合规性
              if (newWindow) {
                // newWindow.location.href = data.pbfixPayUrl;

                newWindow.postMessage({
                  type: 'PAY_URL_READY',
                  url: data.pbfixPayUrl
                }, "*");
              } else {
                if (openUrlInSystemBrowser) {
                  PlatformUtils.openUrlInSystemBrowser(data.pbfixPayUrl);
                } else {
                  sys.openURL(data.pbfixPayUrl);
                }
              }
              gamePermanent.addToCheckOrderTask(_this4.orderId);
              // this.startGetOrderState();
            } else {
              NGame.tips.toast((result == null ? void 0 : result.pbfixMsg) || "Pay_Error".i18nStr());
              // this.btnPay.getComponent(Button).interactable = true;
              // this.btnPayNo.active = false;
              if (newWindow) {
                newWindow.close();
                newWindow = null;
              }
            }
          });
        };
        _proto.createTypeData = function createTypeData(data) {
          return {
            typeName: data.pbfixName,
            typeIconUrl: data.pbfixIconUrl,
            channels: data.pbfixChannelList.map(function (channel) {
              return channel.pbfixName;
            })
          };
        };
        return PayTypePage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnBack", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labPay", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "payItemParent", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnPay", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnPayNo", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnsNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "helpPay", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "PayTypeItem", [_dec9], {
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

System.register("chunks:///_virtual/PlayPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameCfg.ts', './Constant.ts', './Decorators.ts', './UIHelper.ts', './EventMgr.ts', './NodeExt.ts', './VScrollViewItem.ts', './MKExport.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './InstallBanner.ts', './PwaGuideDialog.ts', './PwaInstallHelper.ts', './GoogleAnatytics.ts', './SettingsDialog.ts', './CommonUtils.ts', './PayUtils.ts', './PlatformUtils.ts', './Utils.ts', './BankruptcyAct.ts', './CheckinAct.ts', './Turntable.ts', './VipActivity.ts', './WeeklyCardAct.ts', './WeeklyCardRule.ts', './BannerView.ts', './InsufficientBalanceDialog.ts', './SelBalanceTypeDialog.ts', './DailyFirstRechargeDialog.ts', './FirstDeposit.ts', './FirstDepositLittle.ts', './PayTypePage.ts', './EmailPage.ts', './HelpPage.ts', './LimitedTimeOffer.ts', './FreeBonusWithdraw.ts', './TopMoneyUi.ts', './UserInfoPage.ts', './VipLevelPage.ts', './ActivityJumper.ts', './BaseTabPage.ts', './CashPoolDialog.ts', './CurrencySwitcher.ts', './GameBaseItem.ts', './GuideWidDialog.ts', './HallDialogService.ts', './SwitchTabData.ts'], function (exports, module) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Sprite, v3, NodePool, sp, Tween, Layout, ScrollView, instantiate, tween, Label, PageView, v2, UITransform, ImageAsset, isValid, SpriteFrame, GameCfg, EventName, HomeTabIndex, TabEvent, BundleName, StorageKey, MoneyType, RedDotType, inject, UIHelper, UIPath, EventMgr, PosType, VScrollViewItem, gloEvent, NGame, gameDataMgr, HttpPbFunc, InstallBanner, PwaGuideDialog, PwaInstallHelper, GoogleAnalytics, GAEvent, SettingsDialog, CommonUtils, PayUtils, PlatformUtils, safetyNum, Utils, BankruptcyAct, CheckinAct, Turntable, VipActivity, WeeklyCardAct, WeeklyCardRule, BannerView, InsufficientBalanceDialog, SelBalanceTypeDialog, DailyFirstRechargeDialog, FirstDeposit, FirstDepositLittle, PayTypePage, EmailPage, HelpPage, LimitedTimeOffer, FreeBonusWithdraw, TopMoneyUi, UserInfoPage, VipLevelPage, ActivityJumper, BaseTabPage, CashPoolDialog, CurrencySwitcher, GameBaseItem, GuideWidDialog, HallDialogService, SwitchTabData;
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
      Sprite = module.Sprite;
      v3 = module.v3;
      NodePool = module.NodePool;
      sp = module.sp;
      Tween = module.Tween;
      Layout = module.Layout;
      ScrollView = module.ScrollView;
      instantiate = module.instantiate;
      tween = module.tween;
      Label = module.Label;
      PageView = module.PageView;
      v2 = module.v2;
      UITransform = module.UITransform;
      ImageAsset = module.ImageAsset;
      isValid = module.isValid;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
      BundleName = module.BundleName;
      StorageKey = module.StorageKey;
      MoneyType = module.MoneyType;
      RedDotType = module.RedDotType;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      PosType = module.PosType;
    }, function (module) {
      VScrollViewItem = module.VScrollViewItem;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      InstallBanner = module.InstallBanner;
    }, function (module) {
      PwaGuideDialog = module.PwaGuideDialog;
    }, function (module) {
      PwaInstallHelper = module.PwaInstallHelper;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      SettingsDialog = module.SettingsDialog;
    }, function (module) {
      CommonUtils = module.CommonUtils;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      BankruptcyAct = module.BankruptcyAct;
    }, function (module) {
      CheckinAct = module.CheckinAct;
    }, function (module) {
      Turntable = module.Turntable;
    }, function (module) {
      VipActivity = module.VipActivity;
    }, function (module) {
      WeeklyCardAct = module.WeeklyCardAct;
    }, function (module) {
      WeeklyCardRule = module.WeeklyCardRule;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      InsufficientBalanceDialog = module.InsufficientBalanceDialog;
    }, function (module) {
      SelBalanceTypeDialog = module.SelBalanceTypeDialog;
    }, function (module) {
      DailyFirstRechargeDialog = module.DailyFirstRechargeDialog;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      FirstDepositLittle = module.FirstDepositLittle;
    }, function (module) {
      PayTypePage = module.default;
    }, function (module) {
      EmailPage = module.EmailPage;
    }, function (module) {
      HelpPage = module.HelpPage;
    }, function (module) {
      LimitedTimeOffer = module.LimitedTimeOffer;
    }, function (module) {
      FreeBonusWithdraw = module.FreeBonusWithdraw;
    }, function (module) {
      TopMoneyUi = module.TopMoneyUi;
    }, function (module) {
      UserInfoPage = module.UserInfoPage;
    }, function (module) {
      VipLevelPage = module.VipLevelPage;
    }, function (module) {
      ActivityJumper = module.ActivityJumper;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      CashPoolDialog = module.CashPoolDialog;
    }, function (module) {
      CurrencySwitcher = module.CurrencySwitcher;
    }, function (module) {
      GameBaseItem = module.GameBaseItem;
    }, function (module) {
      GuideWidDialog = module.GuideWidDialog;
    }, function (module) {
      HallDialogService = module.HallDialogService;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30;
      cclegacy._RF.push({}, "7c79aDxzlNGHI5Z7GpgMg74", "PlayPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * Home-play页面
       */
      var PlayPage = exports('PlayPage', (_dec = ccclass('PlayPage'), _dec2 = inject("btnCashPool", Node), _dec3 = inject("root/ScrollView", Node), _dec4 = inject("root/node_top/node_right/btn_recharge", Node), _dec5 = inject("root/node_top/node_right/btn_fresh", Node), _dec6 = inject("root/node_top/node_head/mask_head", Node), _dec7 = inject("root/node_top/node_right/btn_setting", Node), _dec8 = inject("root/node_top/node_right/btn_email", Node), _dec9 = inject("root/node_top/layout_money/label_money", Node), _dec10 = inject("root/node_top/node_head/node_vip/label_vip", Node), _dec11 = inject("root/node_top/node_head/node_vip/icon_vip", Node), _dec12 = inject("root/node_top/node_head/mask_head/img_head", Node), _dec13 = inject("root/node_top/layout_bonus/label_bonus", Node), _dec14 = inject("root/node_top/debugOffsetDay", Node), _dec15 = inject("TopMoneyUi", Node), _dec16 = inject("root/node_top/test_Button", Node), _dec17 = inject("btnReload", Node), _dec18 = inject("root/ScrollView/view/content/TopBonusView", Node), _dec19 = inject("root/ScrollView/view/content/withdrawalNode", Node), _dec20 = inject("root/ScrollView/view/content/withdrawalNode/node_free_balance", Node), _dec21 = inject("root/ScrollView/view/content/withdrawalNode/node_cas_balance", Node), _dec22 = inject("root/ScrollView/view/content/tagBox", Node), _dec23 = inject("root/ScrollView/view/content/gameList", Node), _dec24 = inject("GameBaseItem", Node), _dec25 = inject("root", Node), _dec26 = inject("imgNoGame", Node), _dec27 = inject("root/node_top/bg_cur_currency", Node), _dec28 = inject("root/node_top/bg_cur_currency/btn_switch", Node), _dec29 = inject("gameBaseIcon", Sprite), _dec30 = inject("floatingTagNode", Node), _dec31 = inject("root/InstallBanner", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(PlayPage, _BaseTabPage);
        function PlayPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _this.FLOATING_TAG_STATE_EPSILON = 0.5;
          _this.FLOATING_TAG_POSITION_EPSILON = 0.01;
          _this.curGameCategoryIndex = -1;
          // 当前选中的分类下标 
          _this.curGameCategoryName = "";
          // 分类名称：包含 Love、history、PG、JILI...
          _this.gameCategoryNodes = [];
          _this.allGameCatList = [];
          // 按 game_id 进行分组 
          _initializerDefineProperty(_this, "btnCashPool", _descriptor, _assertThisInitialized(_this));
          // @inject("root/ScrollView", VirtualScrollView)
          // private scrollView: VirtualScrollView = null!;
          _initializerDefineProperty(_this, "scrollView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnRechargeNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "freshBtn", _descriptor4, _assertThisInitialized(_this));
          // 刷新按钮 
          _initializerDefineProperty(_this, "userInfoBtn", _descriptor5, _assertThisInitialized(_this));
          // 个人信息按钮
          _initializerDefineProperty(_this, "settingBtn", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "emailBtn", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moneyLabel", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipLabel", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipSpriteNode", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "avatarNode", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonusLabel", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "debugOffsetDay", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "topMoneyUi", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "testBtn", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnReload", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "topBonusView", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "withdrawalNode", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "freeBonusWithdNode", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cashBonusWithdNode", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tagBox", _descriptor21, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameList", _descriptor22, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameBaseItem", _descriptor23, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rootNode", _descriptor24, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "imgNoGame", _descriptor25, _assertThisInitialized(_this));
          // @inject("root/bContent", Node)
          // private bContent: Node = null!;
          // @inject("root/bContent/ScrollView/view/content/gameScrollView", VirtualScrollView)
          // private gameScrollView: VirtualScrollView = null!;
          _initializerDefineProperty(_this, "bgCurCurrency", _descriptor26, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnSwitchCurrency", _descriptor27, _assertThisInitialized(_this));
          // 切换货币类型
          _initializerDefineProperty(_this, "gameBaseIcon", _descriptor28, _assertThisInitialized(_this));
          // 切换货币类型
          _initializerDefineProperty(_this, "floatingTagNode", _descriptor29, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "installBanner", _descriptor30, _assertThisInitialized(_this));
          _this.ttOriPos = v3();
          _this.ttTween = void 0;
          _this.icRefreshTween = void 0;
          _this.curCatGameList = [];
          _this.newTagLen = 0;
          _this.gameMap = new Map();
          _this.hotList = [];
          _this.historyList = [];
          _this.loveList = [];
          _this.normalGameCatList = [];
          _this.oldTagCatName = "";
          _this.taglists = void 0;
          _this.gameItemPool = new NodePool("GameBaseItem");
          // gameCategoryitemNode: Node;
          _this.collectGameIdSet = new Set();
          _this.gameItemComponentCache = new WeakMap();
          _this.floatingTagCategoryNode = null;
          _this.floatingTagVisible = false;
          _this.floatingTagEventBound = false;
          _this.floatingTagTriggerContentY = Number.POSITIVE_INFINITY;
          _this.lastFloatingTagContentY = Number.NaN;
          _this.mainScrollViewComp = null;
          _this.mainScrollContentNode = null;
          _this.iconPrewarmToken = 0;
          _this.iconPrewarmConcurrency = 2;
          _this._onClickLoveHandler = function (gameId, actionAddToCollect) {
            _this.onClickLoveBtn(gameId, actionAddToCollect);
          };
          _this.TAG_CAT_ITEM_NAME_ALL = "Hot";
          _this.TAG_CAT_ITEM_NAME_HISTORY = "history";
          _this.TAG_CAT_ITEM_NAME_LOVE = "Love";
          return _this;
        }
        var _proto = PlayPage.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.testReload = function testReload() {};
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          // game.frameRate = 120;
          this.bgCurCurrency.getComponent(CurrencySwitcher).initState();
          this.setInstallBanner();
          this.onMsg(EventName.WEB_ORIENTATION_CHANGE, function (state) {
            _this2.setFloatingTagNodePos(0);
          });
          this.onClicked(this.btnReload, this.testReload);
        };
        _proto.setInstallBanner = /*#__PURE__*/function () {
          var _setInstallBanner = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this3 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return PwaInstallHelper.needShowInstallBanner();
                case 2:
                  if (!_context.sent) {
                    _context.next = 6;
                    break;
                  }
                  this.scheduleOnce(function () {
                    _this3.installBanner.getComponent(InstallBanner).onBannerClosed(function () {
                      _this3.scrollView.getComponent(UITransform).height = _this3.scrollView.contentSize().height + _this3.installBanner.contentSize().height;
                      _this3.scheduleOnce(_this3.setFloatingTagNodePos);
                    });
                    // this.installBanner.setSiblingIndex(this.installBanner.parent.children.length - 1);
                    _this3.scrollView.getComponent(UITransform).height = _this3.scrollView.contentSize().height - _this3.installBanner.contentSize().height;
                    _this3.installBanner.active = true;
                    _this3.setFloatingTagNodePos();
                  }, 0.1);
                  _context.next = 7;
                  break;
                case 6:
                  this.setFloatingTagNodePos();
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function setInstallBanner() {
            return _setInstallBanner.apply(this, arguments);
          }
          return setInstallBanner;
        }();
        _proto.setFloatingTagNodePos = function setFloatingTagNodePos(delay) {
          var _this4 = this;
          if (delay === void 0) {
            delay = 0.1;
          }
          this.scheduleOnce(function () {
            var posY = _this4.node.getChildByPath("root/node_top").pos(PosType.BOTTOM_WORLD).y - _this4.floatingTagNode.contentSize().height / 2;
            _this4.floatingTagNode.worldPosition = v3(_this4.floatingTagNode.worldPosition.x, posY);
            _this4.refreshFloatingTagThreshold();
            _this4.queueFloatingTagStateUpdate();
          }, delay);
        };
        _proto.onEnable = function onEnable() {
          // 每次页面切回来都需要重置位置
          // this.scrollView.scrollToTop(false, 0.1);
          this.initTopActivityList();
          this.initWithdrawlView();
          this.updateWithdViewVisible();
          // this.initTagCatView();
          // this.refreshListView()
          this.initBtnCashPool();
          this.updateUserInfo();
          this.setBtnRecharge();
          this.setBtnUpdateUserInfo();
        };
        _proto.initBtnCashPool = function initBtnCashPool() {
          this.btnCashPool.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        };
        _proto.onDisable = function onDisable() {
          // this.offMsg(EventName.ON_GET_USER_INFO);
          // this.offMsg(EventName.ON_OPEN_WEB_GAME);
          if (this.topBonusView) {
            Tween.stopAllByTarget(this.topBonusView);
          }
          this.btnCashPool.getComponent(sp.Skeleton).clearAnimations();
        };
        _proto.open = function open() {
          var _this5 = this;
          NGame.loading.show(null, 1.0);
          this.scheduleOnce(function () {
            NGame.loading.hide();
          }, 1.0);

          // 测试按钮
          if (GameCfg.isDebug) {
            this.testBtn.active = true;
            // this.testBtn.child("Label").getComponent(Label).string = "test1";
            this.onClicked(this.testBtn, function () {});
          }
          this.updateTopViewVisible();
          CommonUtils.autoPlayGlobalAudio(); // 先自动播放静音音效
          this.onMsg(EventName.ON_ACT_LIST_UPDATE, function () {
            if (_this5.node.active) {
              _this5.initTopActivityList();
            }
          });
          this.onMsg(EventName.ON_GET_USER_INFO, function () {
            // this.initTopActivityList();
            // this.refreshListView();
            _this5.setBtnRecharge();
            _this5.updateUserInfo();
            _this5.initWithdrawlView();
            _this5.updateReddotByUserInfoData();
          });
          this.onMsg(EventName.REQUEST_TO_REQ_USER_INFO, function (mData) {
            HttpPbFunc.pbfixUserInfoReq(null, (mData == null ? void 0 : mData.needRefreshBalance) || false, function (data) {
              HallDialogService.getInstance().checkShowGuideWidDialog();
            });
          });
          this.onMsg(EventName.ON_OPEN_WEB_GAME, function () {
            _this5.initGameCategoryList();
            _this5.updateGameList();
          });
          this.onMsg(EventName.SWITICH_CURRENCY_BY_DIALOG, function () {
            _this5.updateWithdViewVisible();
          });
          this.onMsg(EventName.SWITICH_CURRENCY_BY_SWITCHER, function () {
            _this5.updateWithdViewVisible();
          });
          this.onMsg(EventName.REQUEST_OPEN_RECHARGE_PAGE, function () {
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_DEPOSIT
            }));
          });
          this.onClicked(this.btnCashPool.child("click"), function () {
            if (gameDataMgr.isGoStraightToHall) {
              GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
              gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
              return;
            }
            UIHelper.openUI(CashPoolDialog, UIPath.CashPoolDialog);
          }, false, 0.1, false);
          this.onClicked(this.userInfoBtn, function () {
            GoogleAnalytics.track(GAEvent.CLICK_HEAD);
            UIHelper.openUserInfoPage(UserInfoPage);
          }); // 用户信息按钮

          this.onClicked(this.settingBtn, function () {
            GoogleAnalytics.track(GAEvent.CLICK_SETTINGS);
            UIHelper.openUI(SettingsDialog, UIPath.SettingsDialog);

            // let online_url = window.location.href || "";
            // console.log("URL-4:",online_url);
            // NGame.tips.toast(online_url);
          });

          this.onClicked(this.emailBtn, function () {
            GoogleAnalytics.track(GAEvent.CLICK_EMAIL);
            if (gameDataMgr.isGoStraightToHall) {
              GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
              gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
              return;
            }
            UIHelper.openUI(EmailPage, UIPath.EmailPage);
          });
          this.onClicked(this.btnSwitchCurrency, function () {
            GoogleAnalytics.track(GAEvent.CLICK_SWITCH_CURRENCY);
            _this5.bgCurCurrency.getComponent(CurrencySwitcher).onSwitchClick();
          }, false, 0.5);
          this.setTagCatFloatingOptimized();
          this.initGameCategoryList();
          this.updateGameList();
          this.reqRedDotList();

          // 预加载页面
          this.scheduleOnce(function () {
            _this5.preloadPage();
          }, 0.1);
          this.setGameListPadding();
          this.setImgNoGamePos();
        };
        _proto.setGameListPadding = function setGameListPadding() {
          var svWidth = this.scrollView.getChildByPath("view/content").contentSize().width;
          var gameListLrPadding = (svWidth - this.tagBox.contentSize().width) / 2;
          var gameItemJianGe = (svWidth - this.gameBaseItem.contentSize().width * 3 - gameListLrPadding * 2) / 2;
          // `gameItemJianGe = ${gameItemJianGe}`.logI(`asuhd79312376`);
          this.gameList.getComponent(Layout).paddingLeft = gameListLrPadding;
          this.gameList.getComponent(Layout).paddingRight = gameListLrPadding;
          this.gameList.getComponent(Layout).spacingX = gameItemJianGe;
          this.gameList.getComponent(Layout).spacingY = gameItemJianGe;
        };
        _proto.setImgNoGamePos = function setImgNoGamePos() {
          var tagBoxBottomY = this.tagBox.pos(PosType.BOTTOM_WORLD).y;
          var posY = tagBoxBottomY - Math.abs(this.node.pos(PosType.BOTTOM_WORLD).y - tagBoxBottomY) / 2;
          this.imgNoGame.worldPosition = v3(this.imgNoGame.worldPosition.x, posY);
        };
        _proto.updateTopViewVisible = function updateTopViewVisible() {
          var isShowGuestView = gameDataMgr.isGoStraightToHall;
          var topNode = this.node.child('root').child('node_top');
          var headNode = topNode.child('node_head');
          var curNode = topNode.child('bg_cur_currency');
          var moneyNode = topNode.child('layout_money');
          var bonusNode = topNode.child('layout_bonus');
          this.freshBtn.active = !isShowGuestView;
          headNode.active = !isShowGuestView;
          curNode.active = !isShowGuestView;
          moneyNode.active = !isShowGuestView;
          bonusNode.active = !isShowGuestView;
          var topGuestNode = this.node.child('root').child('node_top').child('node_top_guest');
          topGuestNode.active = gameDataMgr.isGoStraightToHall;
          if (isShowGuestView) {
            this.onClicked(topGuestNode.child('btn_login'), function () {
              GoogleAnalytics.track(GAEvent.LOGIN_BTN_HALL);
              gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
            });
          }
        };
        _proto.preloadPage = /*#__PURE__*/function () {
          var _preloadPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var preloadTasks;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  preloadTasks = [UIHelper.regisUserInfoPage(), UIHelper.regisUI(SettingsDialog, UIPath.SettingsDialog), UIHelper.regisUI(EmailPage, UIPath.EmailPage),
                  // UIHelper.regisUI(RegBonusDialog, UIPath.RegBonusDialog),
                  UIHelper.regisUI(Turntable, UIPath.Turntable), UIHelper.regisUI(VipActivity, UIPath.VipActivity), UIHelper.regisUI(CheckinAct, UIPath.CheckinAct), UIHelper.regisUI(WeeklyCardAct, UIPath.WeeklyCardAct), UIHelper.regisUI(WeeklyCardRule, UIPath.WeeklyCardRule), UIHelper.regisUI(BankruptcyAct, UIPath.BankruptcyAct), UIHelper.regisUI(FirstDepositLittle, UIPath.FirstDepositLittle), UIHelper.regisUI(FreeBonusWithdraw, UIPath.FreeBonusWithdraw), UIHelper.regisUI(DailyFirstRechargeDialog, UIPath.DailyFirstRechargeDialog), UIHelper.regisUI(PayTypePage, UIPath.PayTypePage), UIHelper.regisUI(CashPoolDialog, UIPath.CashPoolDialog), UIHelper.regisUI(VipLevelPage, UIPath.VipLevelPage), UIHelper.regisUI(LimitedTimeOffer, UIPath.LimitedTimeOffer), UIHelper.regisUI(SelBalanceTypeDialog, UIPath.SelBalanceTypeDialog), UIHelper.regisUI(InsufficientBalanceDialog, UIPath.InsufficientBalanceDialog), UIHelper.regisUI(HelpPage, UIPath.HelpPage), UIHelper.regisUI(FirstDeposit, UIPath.FirstDeposit), UIHelper.regisUI(GuideWidDialog, UIPath.GuideWidDialog), UIHelper.regisLoginPage()];
                  if (PlatformUtils.isIosMobileBrowser) {
                    preloadTasks.push(UIHelper.regisUI(PwaGuideDialog, UIPath.PwaGuideDialog));
                  }
                  _context2.next = 4;
                  return Promise.all(preloadTasks);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function preloadPage() {
            return _preloadPage.apply(this, arguments);
          }
          return preloadPage;
        }();
        _proto.setTagCatFloatingOptimized = function setTagCatFloatingOptimized() {
          this.ensureMainScrollRefs();
          if (!this.mainScrollViewComp || !this.mainScrollContentNode) {
            return;
          }
          if (!this.floatingTagEventBound) {
            this.mainScrollViewComp.node.on(ScrollView.EventType.SCROLLING, this.onMainScrollViewScrolling, this);
            this.mainScrollViewComp.node.on(ScrollView.EventType.SCROLL_ENDED, this.onMainScrollViewScrolling, this);
            this.floatingTagEventBound = true;
          }
          this.refreshFloatingTagThreshold();
          this.queueFloatingTagStateUpdate();
        };
        _proto.onMainScrollViewScrolling = function onMainScrollViewScrolling() {
          this.queueFloatingTagStateUpdate();
        };
        _proto.ensureMainScrollRefs = function ensureMainScrollRefs() {
          if (!this.mainScrollViewComp || !this.mainScrollViewComp.isValid) {
            this.mainScrollViewComp = this.scrollView.getComponent(ScrollView);
          }
          if (!this.mainScrollContentNode || !this.mainScrollContentNode.isValid) {
            var _this$mainScrollViewC;
            this.mainScrollContentNode = ((_this$mainScrollViewC = this.mainScrollViewComp) == null ? void 0 : _this$mainScrollViewC.content) || this.scrollView.child("view").child("content") || null;
          }
        };
        _proto.queueFloatingTagStateUpdate = function queueFloatingTagStateUpdate() {
          if (!this.node || !this.node.isValid) {
            return;
          }
          this.updateFloatingTagStateOptimized();
        };
        _proto.refreshFloatingTagThreshold = function refreshFloatingTagThreshold() {
          if (!this.tagBox || !this.tagBox.isValid || !this.floatingTagNode || !this.floatingTagNode.isValid) {
            return;
          }
          if (!this.mainScrollContentNode || !this.mainScrollContentNode.isValid) {
            var _this$scrollView;
            this.mainScrollContentNode = ((_this$scrollView = this.scrollView) == null || (_this$scrollView = _this$scrollView.child("view")) == null ? void 0 : _this$scrollView.child("content")) || null;
          }
          if (!this.mainScrollContentNode) {
            return;
          }
          var currentContentY = this.mainScrollContentNode.position.y;
          var currentTagBoxWorldY = this.tagBox.worldPosition.y;
          var floatingTagWorldY = this.floatingTagNode.worldPosition.y;
          this.floatingTagTriggerContentY = currentContentY + (floatingTagWorldY - currentTagBoxWorldY);
          this.lastFloatingTagContentY = Number.NaN;
        };
        _proto.updateFloatingTagStateOptimized = function updateFloatingTagStateOptimized() {
          if (!this.tagBox || !this.tagBox.isValid || !this.tagBox.active) {
            return;
          }
          if (!this.mainScrollContentNode || !this.mainScrollContentNode.isValid) {
            var _this$scrollView2;
            this.mainScrollContentNode = ((_this$scrollView2 = this.scrollView) == null || (_this$scrollView2 = _this$scrollView2.child("view")) == null ? void 0 : _this$scrollView2.child("content")) || null;
          }
          if (!this.mainScrollContentNode) {
            return;
          }
          if (!Number.isFinite(this.floatingTagTriggerContentY)) {
            this.refreshFloatingTagThreshold();
          }
          var contentY = this.mainScrollContentNode.position.y;
          if (Number.isFinite(this.lastFloatingTagContentY) && Math.abs(contentY - this.lastFloatingTagContentY) <= this.FLOATING_TAG_POSITION_EPSILON) {
            return;
          }
          this.lastFloatingTagContentY = contentY;
          var shouldShowFloatingTag = contentY + this.FLOATING_TAG_STATE_EPSILON >= this.floatingTagTriggerContentY;
          if (this.floatingTagVisible === shouldShowFloatingTag) {
            return;
          }
          this.floatingTagVisible = shouldShowFloatingTag;
          if (shouldShowFloatingTag) {
            this.showFloatingTagOptimized();
          } else {
            this.hideFloatingTagOptimized();
          }
        };
        _proto.showFloatingTagOptimized = function showFloatingTagOptimized() {
          this.setFloatingTagNodePos(0);
          this.btnRechargeNode.child("img_bubble").active = false;
          this.floatingTagNode.active = true;
          if (!this.floatingTagCategoryNode || !this.floatingTagCategoryNode.isValid) {
            this.createFloatingTagNodeOptimized();
          }
          if (this.floatingTagCategoryNode) {
            this.floatingTagCategoryNode.getChildByPath("taglists").getComponent(ScrollView).stopAutoScroll();
            this.tagBox.getChildByPath("taglists").getComponent(ScrollView).stopAutoScroll();
            var pos = this.tagBox.getChildByPath("taglists/view/tagcontent").worldPosition.clone();
            this.floatingTagCategoryNode.active = true;
            // `showFloting -> tagBox Offset = ${pos}`.logI(`ashf193rgh1901`)
            var flotingPos = this.floatingTagCategoryNode.getChildByPath("taglists/view/tagcontent").worldPosition;
            this.floatingTagCategoryNode.getChildByPath("taglists/view/tagcontent").worldPosition = v3(pos.x, flotingPos.y);
            // `showFloting -> flotingTag Offset = ${this.floatingTagCategoryNode.getChildByPath(`taglists/view/tagcontent`).worldPosition}`.logI(`ashf193rgh1901`)
          }
          // this.setCatItemState();
        };

        _proto.hideFloatingTagOptimized = function hideFloatingTagOptimized() {
          this.floatingTagNode.active = false;
          if (this.floatingTagCategoryNode && this.floatingTagCategoryNode.isValid) {
            this.floatingTagCategoryNode.getChildByPath("taglists").getComponent(ScrollView).stopAutoScroll();
            this.tagBox.getChildByPath("taglists").getComponent(ScrollView).stopAutoScroll();
            var pos = this.floatingTagCategoryNode.getChildByPath("taglists/view/tagcontent").worldPosition.clone();
            // `hideFloting -> flotingTag Offset = ${pos}`.logI(`ashf193rgh1901`)
            this.floatingTagCategoryNode.active = false;
            var tagBosPos = this.tagBox.getChildByPath("taglists/view/tagcontent").worldPosition;
            this.tagBox.getChildByPath("taglists/view/tagcontent").worldPosition = v3(pos.x, tagBosPos.y);
            // `hideFloting -> tagBox Offset = ${this.tagBox.getChildByPath(`taglists/view/tagcontent`).worldPosition}`.logI(`ashf193rgh1901`)
          }
          // this.floatingTagNode.active = false;
          this.btnRechargeNode.child("img_bubble").active = true;
        };
        _proto.createFloatingTagNodeOptimized = function createFloatingTagNodeOptimized() {
          var _this$floatingTagCate,
            _this6 = this;
          if (!this.tagBox || !this.tagBox.isValid) {
            return;
          }
          var newTagCatNode = instantiate(this.tagBox);
          newTagCatNode.removeComponent(VScrollViewItem);
          (_this$floatingTagCate = this.floatingTagCategoryNode) == null || _this$floatingTagCate.destroy();
          newTagCatNode.parent = this.floatingTagNode;
          newTagCatNode.position = v3();
          var posX = this.tagBox.getChildByPath("taglists/view/tagcontent").position.clone().x;
          newTagCatNode.getChildByPath("taglists/view/tagcontent").position = v3(posX);
          this.floatingTagCategoryNode = newTagCatNode;
          this.floatingTagNode.active = true;
          newTagCatNode.getChildByPath("taglists/view/tagcontent").children.forEach(function (tagItem, idx) {
            var tagNodeName = tagItem.name;
            if (tagNodeName == _this6.TAG_CAT_ITEM_NAME_ALL) {
              tagItem.child("inner").child("ic").loadImg("page_play/img/Group 59134", BundleName.HALL, _this6);
            } else if (tagNodeName == _this6.TAG_CAT_ITEM_NAME_HISTORY) {
              tagItem.child("inner").child("ic").loadImg("page_play/img/clock", BundleName.HALL, _this6);
            } else if (tagNodeName == _this6.TAG_CAT_ITEM_NAME_LOVE) {
              tagItem.child("inner").child("ic").loadImg("page_play/img/hear3", BundleName.HALL, _this6);
            } else if (_this6.normalGameCatList[idx]) {
              _this6.setTagIcon(tagItem, _this6.normalGameCatList[idx]);
            }
          });
          newTagCatNode.getChildByPath("taglists/view/tagcontent").children.forEach(function (item, idx) {
            _this6.onClicked(item, function () {
              // this.scrollView.scrollToIndex(2);
              _this6.onClickGameCategoryItem(idx);
            });
          });
        };
        _proto.rebuildFloatingTagNodeOptimized = function rebuildFloatingTagNodeOptimized() {
          if (this.floatingTagCategoryNode && this.floatingTagCategoryNode.isValid) {
            this.floatingTagCategoryNode.destroy();
            // this.floatingTagNode.active = false;
            // this.floatingTagVisible = false;
          }

          this.floatingTagCategoryNode = null;
          if (this.floatingTagVisible) {
            this.showFloatingTagOptimized();
          }
          if (this.floatingTagCategoryNode) {
            this.actionCatItemState(this.floatingTagCategoryNode.getChildByPath("taglists/view/tagcontent").children, this.floatingTagCategoryNode.getChildByPath("taglists"));
          }
        };
        _proto.getGameBaseItemsOptimized = function getGameBaseItemsOptimized(gameItemsNode) {
          var cachedItems = this.gameItemComponentCache.get(gameItemsNode);
          if (!cachedItems) {
            cachedItems = gameItemsNode.children.map(function (childNode) {
              return childNode.getComponent(GameBaseItem);
            }).filter(function (item) {
              return !!item;
            });
            this.gameItemComponentCache.set(gameItemsNode, cachedItems);
          }
          return cachedItems;
        };
        _proto.prewarmCurrentCategoryIcons = function prewarmCurrentCategoryIcons() {
          var _this$curCatGameList;
          this.iconPrewarmToken++;
          var token = this.iconPrewarmToken;
          if (!this.node || !this.node.isValid || !((_this$curCatGameList = this.curCatGameList) != null && _this$curCatGameList.length)) {
            return;
          }
          var uniqueUrls = [];
          var seenUrls = new Set();
          for (var index = 0; index < this.curCatGameList.length; index++) {
            var _this$curCatGameList$;
            var iconUrl = (_this$curCatGameList$ = this.curCatGameList[index]) == null ? void 0 : _this$curCatGameList$.pbfixIcon;
            if (!iconUrl || seenUrls.has(iconUrl) || GameBaseItem.hasCachedIcon(iconUrl)) {
              continue;
            }
            seenUrls.add(iconUrl);
            uniqueUrls.push(iconUrl);
          }
          if (uniqueUrls.length <= 0) {
            return;
          }
          var workerCount = Math.min(this.iconPrewarmConcurrency, uniqueUrls.length);
          for (var _index = 0; _index < workerCount; _index++) {
            this.runIconPrewarmWorker(uniqueUrls, token);
          }
        };
        _proto.runIconPrewarmWorker = function runIconPrewarmWorker(iconUrls, token) {
          var _this7 = this;
          if (token !== this.iconPrewarmToken || !this.node || !this.node.isValid) {
            return;
          }
          var iconUrl = iconUrls.shift();
          if (!iconUrl) {
            return;
          }
          GameBaseItem.preloadIcon(iconUrl, this.node)["finally"](function () {
            if (token !== _this7.iconPrewarmToken || !_this7.node || !_this7.node.isValid) {
              return;
            }
            _this7.scheduleOnce(function () {
              _this7.runIconPrewarmWorker(iconUrls, token);
            }, 0.02);
          });
        }

        // private fillGameItemsOptimized(gameItemsNode: Node, index: number) {
        //     const startIndex = (index - 3) * 3;
        //     const gameBaseItems = this.getGameBaseItemsOptimized(gameItemsNode);
        //     for (let idx = 0; idx < 3; idx++) {
        //         const gameData = this.curCatGameList[startIndex + idx];
        //         const childNode = gameItemsNode.children[idx];
        //         childNode.active = gameData != null;
        //         if (!gameData) {
        //             continue;
        //         }

        //         const gameBaseItem = gameBaseItems[idx];
        //         if (!gameBaseItem) {
        //             continue;
        //         }

        //         if (gameBaseItem.onClickLoveFunc !== this._onClickLoveHandler) {
        //             gameBaseItem.onClickLoveFunc = this._onClickLoveHandler;
        //         }
        //         gameBaseItem.showIconData(gameData, this.gameBaseIcon.spriteFrame, this.collectGameIdSet.has(gameData.pbfixId));
        //     }
        // }
        ;

        _proto.setBtnRecharge = function setBtnRecharge() {
          var _this$floatingTagCate2,
            _this8 = this;
          if ((_this$floatingTagCate2 = this.floatingTagCategoryNode) != null && _this$floatingTagCate2.active) {
            return;
          }
          var bonusAniNode = this.btnRechargeNode.child("img_bubble");
          bonusAniNode.active = !PayUtils.isFirstPayActBuyed;
          if (bonusAniNode.active) {
            var _gameDataMgr$payConf, _this$ttTween;
            bonusAniNode.child("label_bonus").setText("Bonus".i18nStr() + " +" + safetyNum(gameDataMgr == null || (_gameDataMgr$payConf = gameDataMgr.payConf) == null || (_gameDataMgr$payConf = _gameDataMgr$payConf.pbfixFirstPayConf) == null ? void 0 : _gameDataMgr$payConf.pbfixMaxGiftRate).cToFeeRateNum() + "%");
            this.ttOriPos = bonusAniNode.position.clone();
            if (!this.ttTween) {
              this.ttTween = tween(bonusAniNode).set({
                position: this.ttOriPos
              }).to(1.5, {
                position: this.ttOriPos.clone().subtract(v3(0, 10))
              }).to(1.5, {
                position: this.ttOriPos
              }).union().repeatForever().bindNodeState(false);
            }
            (_this$ttTween = this.ttTween) == null || _this$ttTween.start();
          }
          var btnRecharge = this.btnRechargeNode.child("img_recharge");
          this.onClicked(btnRecharge, function () {
            var _this8$ttTween2;
            if (gameDataMgr.isGoStraightToHall) {
              GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
              gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
              return;
            }
            _this8.topMoneyUi.getComponent(TopMoneyUi).openView(function () {
              bonusAniNode.active = !PayUtils.isFirstPayActBuyed;
              if (bonusAniNode.active) {
                var _this8$ttTween;
                (_this8$ttTween = _this8.ttTween) == null || _this8$ttTween.start();
              }
            });
            (_this8$ttTween2 = _this8.ttTween) == null || _this8$ttTween2.stop();
            bonusAniNode.active = false;
          });
        };
        _proto.setBtnUpdateUserInfo = function setBtnUpdateUserInfo() {
          var _this9 = this;
          this.onClicked(this.freshBtn, function () {
            var _this9$icRefreshTween, _this9$icRefreshTween2;
            // `onClicked`.logI(`9uasb9uasbubu9o`)
            _this9.offClicked(_this9.freshBtn);
            // const icRefresh = this.freshBtn.child(`icRefresh`);
            if (!_this9.icRefreshTween) {
              _this9.icRefreshTween = tween(_this9.freshBtn).set({
                angle: 0
              }).to(1, {
                angle: -720
              }).union().repeatForever().bindNodeState(false);
            }
            (_this9$icRefreshTween = _this9.icRefreshTween) == null || _this9$icRefreshTween.stop();
            (_this9$icRefreshTween2 = _this9.icRefreshTween) == null || _this9$icRefreshTween2.start();
            var actionTiem = Date.now();
            HttpPbFunc.pbfixUserInfoReq(_this9.node, false, function () {
              var delay = 0;
              var totalTime = Date.now() - actionTiem;
              if (totalTime < 1000) {
                delay = 1000 - totalTime;
              }
              _this9.scheduleOnce(function () {
                var _this9$icRefreshTween3;
                (_this9$icRefreshTween3 = _this9.icRefreshTween) == null || _this9$icRefreshTween3.stop();
                _this9.setBtnUpdateUserInfo();
              }, delay / 1000);
            });
          });
        };
        _proto.updateUserInfo = function updateUserInfo() {
          var _this$moneyLabel, _gameDataMgr$userInfo, _this$bonusLabel, _gameDataMgr$userInfo2, _this$vipLabel, _gameDataMgr$userInfo3, _gameDataMgr$userInfo4;
          (_this$moneyLabel = this.moneyLabel) == null || _this$moneyLabel.setText(safetyNum((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixBalance).cToRateNum());
          (_this$bonusLabel = this.bonusLabel) == null || _this$bonusLabel.setText(safetyNum((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixBonus).cToRateNum());
          (_this$vipLabel = this.vipLabel) == null || _this$vipLabel.setText("LV." + gameDataMgr.userInfo.pbfixVip);
          this.vipSpriteNode.loadImg("UserInfo/img/vip_lv" + CommonUtils.getVipIconIndex(gameDataMgr.userInfo.pbfixVip || 0), BundleName.HALL, this.node);
          var avatarIndex = (_gameDataMgr$userInfo3 = (_gameDataMgr$userInfo4 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo4.pbfixAvatar) != null ? _gameDataMgr$userInfo3 : "12";
          this.avatarNode.loadImg("UserInfo/img/avatar/avatar_" + avatarIndex, BundleName.HALL, this.node);
        };
        _proto.close = function close(config_) {
          var _this$gameItemPool;
          // 清理对象池
          (_this$gameItemPool = this.gameItemPool) == null || _this$gameItemPool.clear();
          EventMgr.instance.off(this);
          _BaseTabPage.prototype.close.call(this, config_);
        };
        _proto.initWithdrawlView = function initWithdrawlView() {
          this.onClicked(this.withdrawalNode.child("btnWithdrawal"), this.showWithdrawlPage.bind(this));
          this.initFreeBalanceWithdView();
          this.initCashBalanceWithdView();
        };
        _proto.updateWithdViewVisible = function updateWithdViewVisible() {
          var curSelCurrencyType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          var isCash = curSelCurrencyType == MoneyType.MONEY_TYPE_BALANCE;
          this.cashBonusWithdNode.active = isCash;
          this.freeBonusWithdNode.active = !isCash;
        };
        _proto.initCashBalanceWithdView = function initCashBalanceWithdView() {
          var _gameDataMgr$userInfo5;
          var _curbouns = safetyNum((_gameDataMgr$userInfo5 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo5.pbfixBalance).cToRateNum();
          this.cashBonusWithdNode.child("myCashLb").getComponent(Label).string = Utils.changeMoneyUnit(_curbouns, 1);
        };
        _proto.initFreeBalanceWithdView = function initFreeBalanceWithdView() {
          var _gameDataMgr$userInfo6, _gameDataMgr$hallConf;
          var _curbouns = safetyNum((_gameDataMgr$userInfo6 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo6.pbfixBonus).cToRateNum();
          this.freeBonusWithdNode.child("myCashLb").getComponent(Label).string = Utils.changeMoneyUnit(_curbouns, 1);
          var bonusWMinBalance = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixBonusWMinBalance).cToRateNum();
          var curbouns = _curbouns / bonusWMinBalance;
          var proBb = Utils.changeMoneyUnit(_curbouns, 3) + "/" + Utils.changeMoneyUnit(bonusWMinBalance, 3);
          this.freeBonusWithdNode.child("cashProLb").getComponent(Label).string = proBb;
          this.freeBonusWithdNode.child("cashpro").getComponent(Sprite).fillRange = curbouns;
          this.freeBonusWithdNode.child("cashProLbMAX").active = curbouns >= 1;
          this.freeBonusWithdNode.child("cashProLb").active = curbouns < 1;
        }

        /**去提现界面 */;
        _proto.showWithdrawlPage = function showWithdrawlPage() {
          if (gameDataMgr.isGoStraightToHall) {
            GoogleAnalytics.track(GAEvent.LOGIN_OTHERS);
            gloEvent.emit(EventName.REQUEST_OPEN_LOGIN_PAGE);
            return;
          }
          var curSelCurrencyType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          if (curSelCurrencyType == MoneyType.MONEY_TYPE_BALANCE) {
            GoogleAnalytics.track(GAEvent.CASH_WITHDRAW);
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_W
            }));
          } else {
            GoogleAnalytics.track(GAEvent.BONUS_WITHDRAW);
            NGame.uiManage.open(FreeBonusWithdraw);
          }
        }

        /**初始化轮播图 */;
        _proto.initTopActivityList = function initTopActivityList() {
          var _this10 = this;
          var bannerView = this.topBonusView.getChildByPath("view/BannerView");
          var bannerContent = this.topBonusView.getChildByPath("view/bannerContent");
          var bonusActivityList = gameDataMgr.bonusActivityList;
          this.topBonusView.getComponent(PageView).removeAllPages();
          var _loop = function _loop() {
            var data = bonusActivityList[index];
            // if (data.type == 7 && ActivityManager.instance.getActivityStatus(data)) { //  判断活动类型和状态
            // if (true) {
            var item = instantiate(bannerView);
            item.parent = bannerContent;
            item.active = true;
            _this10.topBonusView.getComponent(PageView).addPage(item);
            item.getComponent(BannerView).setData(data, false);
            _this10.onClicked(item, function () {
              ActivityJumper.open(data);
            }, false, 1.0, false);
          };
          for (var index = 0; index < bonusActivityList.length; index++) {
            _loop();
          }
          Tween.stopAllByTarget(this.topBonusView);
          tween(this.topBonusView).delay(6).call(function () {
            var index = _this10.topBonusView.getComponent(PageView).getCurrentPageIndex();
            if (index == _this10.topBonusView.getComponent(PageView).getPages().length - 1) {
              index = 0;
            } else {
              index++;
            }
            _this10.topBonusView.getComponent(PageView).scrollToPage(index, 0.3);
          }).union().repeatForever().bindNodeState(false).start();
        };
        _proto.initTagCatData = function initTagCatData() {
          var gameListData = gameDataMgr.gameListData || {};

          // `pbfixCategories.length = ${gameDataMgr.gameListData.pbfixCategories.length}, pbfixGames.length = ${gameDataMgr.gameListData.pbfixGames.length}`.logI(`dsf0012h010`)

          var tgIndex = 0;
          this.gameMap = new Map(); // 按 game_id 进行分类
          this.hotList = []; // 热门游戏
          this.historyList = [];
          this.loveList = [];
          this.normalGameCatList = [];
          this.allGameCatList = [];
          this.collectGameIdSet = new Set();
          for (var index = 0; index < gameDataMgr.collectGameList.length; index++) {
            this.collectGameIdSet.add(gameDataMgr.collectGameList[index].pbfixGameId);
          }

          // 先把每个游戏进行分类
          for (var _index2 = 0; _index2 < gameListData.pbfixGames.length; _index2++) {
            var element = gameListData.pbfixGames[_index2];
            if (this.gameMap.has(element.pbfixCategoryId)) {
              var data = this.gameMap.get(element.pbfixCategoryId);

              // for (let index = 0; index < 8; index++) {
              data.push(element);
              // }
              this.gameMap.set(element.pbfixCategoryId, data);
            } else {
              this.gameMap.set(element.pbfixCategoryId, [element]);
            }

            // 收藏 / 历史
            if (gameDataMgr.gameHistorys.includes(element.pbfixId)) {
              this.historyList.push(element);
            }
            if (this.collectGameIdSet.has(element.pbfixId)) {
              this.loveList.push(element);
            }
          }
          if (this.historyList.length > 0) {
            // 强制按照 historys 里的索引排序
            this.historyList.sort(function (a, b) {
              var indexA = gameDataMgr.gameHistorys.indexOf(a.pbfixId);
              var indexB = gameDataMgr.gameHistorys.indexOf(b.pbfixId);
              return indexA - indexB;
            });
          }
          this.newTagLen = gameListData.pbfixCategories.length;
          tgIndex = gameListData.pbfixCategories.length - 1;
          // 分类标签从右往左添加
          // 先添加默认标签
          for (var _index3 = gameListData.pbfixCategories.length - 1; _index3 >= 0; _index3--) {
            var cat = gameListData.pbfixCategories[_index3];
            this.allGameCatList.push(this.gameMap.get(cat.pbfixId));
            this.normalGameCatList.push(cat);
          }
          for (var _index4 = 0; _index4 < this.normalGameCatList.length; _index4++) {
            var _cat = this.normalGameCatList[_index4];
            if (this.curGameCategoryName == _cat.pbfixName) {
              this.curGameCategoryIndex = _index4;
            }
          }
          this.hotList = gameListData.pbfixGames.filter(function (game) {
            return game.pbfixIsHot && !game.pbfixIsNew;
          });
          // `hotList = ${this.hotList.length}`.logI(`dsf0012h010`);
          // 添加热门游戏标签
          if (this.hotList.length > 0) {
            tgIndex++;
            this.allGameCatList.push(this.hotList);
            if (this.curGameCategoryName == this.TAG_CAT_ITEM_NAME_ALL) {
              // 所有游戏
              this.curGameCategoryIndex = tgIndex;
            }
            this.newTagLen++;
          }

          // `historyList = ${this.historyList.length}`.logI(`dsf0012h010`);
          // 添加历史玩过的游戏标签
          if (this.historyList.length > 0) {
            tgIndex++;
            this.allGameCatList.push(this.historyList);
            if (this.curGameCategoryName == this.TAG_CAT_ITEM_NAME_HISTORY) {
              this.curGameCategoryIndex = tgIndex;
            }
            this.newTagLen++;
          }

          // `loveList = ${this.loveList.length}`.logI(`dsf0012h010`);
          // 添加收藏标签
          this.allGameCatList.push(this.loveList);
          tgIndex++;
          this.newTagLen++;
          if (this.curGameCategoryName == this.TAG_CAT_ITEM_NAME_LOVE) {
            this.curGameCategoryIndex = tgIndex;
          }
          if (this.curGameCategoryName.length == 0 || this.curGameCategoryIndex < 0
          // || (this.curGameCategoryName == this.TAG_CAT_ITEM_NAME_LOVE && this.loveList.length <= 0)
          ) {
            if (this.hotList.length > 0) {
              this.curGameCategoryName = this.TAG_CAT_ITEM_NAME_ALL;
              this.curGameCategoryIndex = this.normalGameCatList.length;
            } else {
              this.curGameCategoryName = this.normalGameCatList[this.normalGameCatList.length - 1].pbfixName;
              this.curGameCategoryIndex = this.normalGameCatList.length - 1;
            }
          }
        };
        _proto.onClickLoveBtn = /*#__PURE__*/function () {
          var _onClickLoveBtn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(gameId, actionAddToCollect) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (actionAddToCollect) {
                    gameDataMgr.addToCollectGameList(gameId);
                  } else {
                    gameDataMgr.removeCollectGame(gameId);
                  }
                  this.initTagCatData();
                // if (this.tagBox) {
                // `${this.curGameCategoryName}`.logI(`asu0h013r018`)
                // if (this.curGameCategoryName == this.TAG_CAT_ITEM_NAME_LOVE) {
                //     this.updateGameList();
                // }

                // } else {
                //     this.updateGameList();
                // }
                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function onClickLoveBtn(_x, _x2) {
            return _onClickLoveBtn.apply(this, arguments);
          }
          return onClickLoveBtn;
        }() /** 初始化游戏分类列表 */;
        _proto.initGameCategoryList = function initGameCategoryList() {
          var _this11 = this;
          this.initTagCatData();
          // `this.newTagLen = ${this.newTagLen}, this.gameCategoryNodes.length = ${this.gameCategoryNodes.length}`.logI(`saud1r0naosho`);

          /**没有新加标签没必要重新刷新 */
          if (this.newTagLen <= 0 || this.gameCategoryNodes.length == this.newTagLen) {
            this.setCatItemState();
            this.refreshFloatingTagThreshold();
            this.queueFloatingTagStateUpdate();
            return;
          }
          this.taglists = this.tagBox.getChildByPath("taglists");
          var tagbase = this.tagBox.getChildByPath("taglists/view/tagbase");
          var tagcontent = this.tagBox.getChildByPath("taglists/view/tagcontent");
          var gameListData = gameDataMgr.gameListData || {};
          if (this.gameCategoryNodes.length != this.newTagLen) {
            tagcontent.removeAllChildren();
            this.gameCategoryNodes = [];
          }

          // 普通游戏标签
          var _loop2 = function _loop2(index) {
            var cat = _this11.normalGameCatList[index];
            if (_this11.gameCategoryNodes.length != _this11.newTagLen) {
              var _item3 = instantiate(tagbase);
              _item3.parent = tagcontent;
              _item3.active = true;
              _item3.name = cat.pbfixId + "";
              _this11.setTagIcon(_item3, cat);
              _this11.gameCategoryNodes.push(_item3);
              _this11.onClicked(_item3, function () {
                _this11.onClickGameCategoryItem(index);
              });
            }
          };
          for (var index = 0; index < this.normalGameCatList.length; index++) {
            _loop2(index);
          }
          var tgIndex = this.normalGameCatList.length - 1;
          if (this.hotList.length > 0) {
            tgIndex++;
            var _tt = tgIndex;
            if (this.gameCategoryNodes.length != this.newTagLen) {
              var item = instantiate(tagbase);
              item.parent = tagcontent;
              item.active = true;
              item.name = this.TAG_CAT_ITEM_NAME_ALL;
              item.child("inner").child("name").active = true;
              item.child("inner").child("name").setText(this.TAG_CAT_ITEM_NAME_ALL.i18nStr());
              item.child("inner").child("ic").getComponent(Sprite).sizeMode = Sprite.SizeMode.RAW;
              item.child("inner").child("ic").loadImg("page_play/img/Group 59134", BundleName.HALL, this);
              // item.child("inner").child(`ic`).loadImg(`page_play/img/icon_hot_sel`, BundleName.HALL, this)
              this.gameCategoryNodes.push(item);
              this.onClicked(item, function () {
                _this11.onClickGameCategoryItem(_tt);
              });
            }
          }
          if (this.historyList.length > 0) {
            tgIndex++;
            var _tt2 = tgIndex;
            if (this.gameCategoryNodes.length != this.newTagLen) {
              var _item = instantiate(tagbase);
              _item.parent = tagcontent;
              _item.active = true;
              _item.name = this.TAG_CAT_ITEM_NAME_HISTORY;
              _item.child("inner").child("ic").loadImg("page_play/img/clock", BundleName.HALL, this);
              this.gameCategoryNodes.push(_item);
              this.onClicked(_item, function () {
                _this11.onClickGameCategoryItem(_tt2);
              });
            }
          }

          // if (this.loveList.length > 0) {
          tgIndex++;
          var tt = tgIndex;
          if (this.gameCategoryNodes.length != this.newTagLen) {
            var _item2 = instantiate(tagbase);
            _item2.parent = tagcontent;
            _item2.active = true;
            _item2.name = this.TAG_CAT_ITEM_NAME_LOVE;
            _item2.child("inner").child("ic").loadImg("page_play/img/hear3", BundleName.HALL, this);
            this.gameCategoryNodes.push(_item2);
            this.onClicked(_item2, function () {
              _this11.onClickGameCategoryItem(tt);
            });
          }
          // }

          this.scheduleOnce(function () {
            _this11.setCatItemState();
            _this11.rebuildFloatingTagNodeOptimized();
            _this11.refreshFloatingTagThreshold();
            _this11.queueFloatingTagStateUpdate();
          });

          /**搜索游戏 */
          // this.allChildrenNodes.sEditBox.on('text-changed', this.onEditBoxTextChanged, this);

          // this.onClicked(this.allChildrenNodes.seachBox, () => {
          //     this.onClickGameSearchBtn();
          // })
        }

        /**
         * 选中游戏分类选项
         */;
        _proto.onClickGameCategoryItem = function onClickGameCategoryItem(index) {
          // if (this.curGameCategoryIndex == index) {
          //     return
          // }

          this.curGameCategoryIndex = index;
          this.setCatItemState();
          this.updateGameList();
        };
        _proto.setCatItemState = function setCatItemState() {
          this.actionCatItemState(this.gameCategoryNodes, this.taglists);
          if (this.floatingTagCategoryNode) {
            // if (this.floatingTagNode.active && this.floatingTagCategoryNode?.active) {
            this.actionCatItemState(this.floatingTagCategoryNode.getChildByPath("taglists/view/tagcontent").children, this.floatingTagCategoryNode.getChildByPath("taglists"));
          }
        };
        _proto.actionCatItemState = function actionCatItemState(nodeArr, taglists) {
          var curCatItem;
          var curCatItemIdx = 0;
          for (var index = 0; index < nodeArr.length; index++) {
            var catItem = nodeArr[index];
            if (index == this.curGameCategoryIndex) {
              this.curGameCategoryName = catItem.name;
              curCatItem = catItem;
              curCatItemIdx = index;
              catItem.child("selImg").active = true;
            } else {
              catItem.child("selImg").active = false;
            }
          }
          if (taglists && taglists.isValid && curCatItem) {
            var sv = taglists.getComponent(ScrollView);
            sv.stopAutoScroll();
            var taglistsViewNode = taglists.child("view");
            var getTargetPosX = function getTargetPosX(node) {
              return node.pos(PosType.LEFT_WORLD).x - taglistsViewNode.worldPosition.x + taglistsViewNode.contentSize().width - sv.getScrollOffset().x;
            };
            var leftCatItem = nodeArr[curCatItemIdx + 1];
            var rightCatItem = nodeArr[curCatItemIdx - 1];
            if (leftCatItem && leftCatItem.pos(PosType.LEFT_WORLD).x < taglistsViewNode.pos(PosType.LEFT_WORLD).x) {
              // 左边还有标签没显示完完整
              var targetPosX = getTargetPosX(leftCatItem);
              sv.scrollToOffset(v2(targetPosX), 0.1, false);
            } else if (rightCatItem && rightCatItem.pos(PosType.RIGHT_WORLD).x > taglistsViewNode.pos(PosType.RIGHT_WORLD).x) {
              // 右边还有标签没显示完完整
              var _targetPosX = getTargetPosX(rightCatItem);
              sv.scrollToOffset(v2(_targetPosX), 0.1, false);
            } else if (curCatItem.pos(PosType.LEFT_WORLD).x < taglistsViewNode.pos(PosType.LEFT_WORLD).x || curCatItem.pos(PosType.RIGHT_WORLD).x > taglistsViewNode.pos(PosType.RIGHT_WORLD).x) {
              // 自己本标签没显示完整
              var _targetPosX2 = getTargetPosX(curCatItem);
              sv.scrollToOffset(v2(_targetPosX2), 0.1, false);
            }

            // const targetPosX = curCatItem.pos(PosType.LEFT_WORLD).x - taglistsViewNode.worldPosition.x + taglistsViewNode.contentSize().width - sv.getScrollOffset().x;
            // sv.scrollToOffset(v2(targetPosX), 0.1, false);
          }
        }

        /**
         * 搜索游戏
         */;
        _proto.onClickGameSearchBtn = /*#__PURE__*/
        function () {
          var _onClickGameSearchBtn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var gameSearch;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return module.import('./GameSearch.ts');
                case 2:
                  gameSearch = _context4.sent;
                  NGame.uiManage.regis(gameSearch.GameSearch, "db://assets/hall/page_play/prefab/GameSearch.prefab", this.node);
                  NGame.uiManage.open(gameSearch.GameSearch);
                case 5:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function onClickGameSearchBtn() {
            return _onClickGameSearchBtn.apply(this, arguments);
          }
          return onClickGameSearchBtn;
        }()
        /**
         * 
         * @param item 
         * @param element 
         */;

        _proto.setTagIcon = /*#__PURE__*/
        function () {
          var _setTagIcon = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(item, element) {
            var _this12 = this;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  NGame.asset.get(element.pbfixIcon || "", ImageAsset, this.node, {
                    remoteOption: {
                      ext: ".png"
                    },
                    completedFunc: function completedFunc(error, ia) {
                      if (!error && ia) {
                        if (!isValid(_this12.node)) {
                          return;
                        }
                        var icNode = item.child("inner").child("ic");
                        icNode.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(ia);
                        // let scale = 70 / icNode.getComponent(UITransform).height
                        var scale = 70 / 200; // 约定网络图片高度固定200
                        icNode.getComponent(UITransform).width = icNode.contentSize().width * scale;
                        icNode.getComponent(UITransform).height = icNode.contentSize().height * scale;
                      }
                    }
                  });
                case 1:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function setTagIcon(_x3, _x4) {
            return _setTagIcon.apply(this, arguments);
          }
          return setTagIcon;
        }() // onEditBoxTextChanged(editBox: EditBox) {
        //     const text = editBox.string;
        //     this.updateGameList(text)
        // }
        /**
         * 刷新游戏图标列表
         * @param gameSearchStr 游戏搜索字符串
         * @returns 
         */;

        _proto.updateGameList = function updateGameList(gameSearchStr, isActionLoved) {
          var _this13 = this;
          // `this.curGameCategoryIndex = ${this.curGameCategoryIndex}, allCatLength = ${this.allGameCatList.length}, curCatGameList = ${this.allGameCatList[this.curGameCategoryIndex].length}`.logI(`dsf0012h010`)
          var gameList = this.allGameCatList[this.curGameCategoryIndex];
          if (gameList) {
            this.scrollView.getComponent(ScrollView).stopAutoScroll();
            for (var index = this.gameList.children.length - 1; index >= 0; index--) {
              this.removeGameItem(this.gameList.children[index]);
            }
            GameBaseItem.loadIcTotalCount = gameList.length;
            this.imgNoGame.active = gameList.length <= 0;
            gameList.forEach(function (gameData) {
              var gameItem = _this13.createGameItem();
              gameItem.active = true;
              _this13.gameList.addChild(gameItem);
              gameItem.getComponent(GameBaseItem).onClickLoveFunc = _this13._onClickLoveHandler;
              gameItem.getComponent(GameBaseItem).showIconData(gameData, _this13.gameBaseIcon.spriteFrame, _this13.collectGameIdSet.has(gameData.pbfixId));
            });
            this.prewarmCurrentCategoryIcons();
            this.scheduleOnce(function () {
              _this13.onMainScrollViewScrolling();
            }, 0.1);
            // if (this.tagBox.worldPosition.y > this.floatingTagCategoryNode.worldPosition.y) {
            //     this.updateFloatingTagStateOptimized();
            //     this.hideFloatingTagOptimized()
            //     // this.floatingTagNode.active = false;
            //     // this.btnRechargeNode.child(`img_bubble`).active = true;
            // }
          }
        };

        _proto.createGameItem = function createGameItem() {
          var item = this.gameItemPool.get();
          if (!item) {
            item = instantiate(this.gameBaseItem);
          }
          return item;
        };
        _proto.removeGameItem = function removeGameItem(gameItem) {
          this.gameItemPool.put(gameItem);
        }

        /**
         * 根据gameId查找游戏
         * @param gameId 
         * @returns 
         */;
        _proto.findGameByGameId = function findGameByGameId(gameId) {
          var gameListData = gameDataMgr.gameListData || {};
          for (var index = 0; index < gameListData.pbfixGames.length; index++) {
            var gameItem = gameListData.pbfixGames[index];
            if (gameItem.pbfixId == gameId) {
              return gameItem;
            }
          }
          return null;
        }

        /**
         * 请求红点列表
         */;
        _proto.reqRedDotList = function reqRedDotList() {
          var _this14 = this;
          if (gameDataMgr.isGoStraightToHall) {
            return;
          }
          NGame.loading.show(null, 2.0);
          HttpPbFunc.pbfixRedDotListReq(this.node, function (result) {
            _this14.updateRedDotStatus(result);
            NGame.loading.hide();
            if (!gameDataMgr.gameBaseData.regBonusDialogTag) {
              gameDataMgr.gameBaseData.regBonusDialogTag = false;
              HallDialogService.getInstance().initDialogConf(false);
            }
          });
        }

        /**
         * 更新红点状态【每次进大厅全局刷一次】
         * @param result 
         */;
        _proto.updateRedDotStatus = function updateRedDotStatus(result) {
          // 1. 更新本地数据管理器中的 Set
          // 确保 result.pbfixRedDotList 是数组，如果为空则初始化为空 Set
          gameDataMgr.redDotSet = new Set((result == null ? void 0 : result.pbfixRedDotList) || []);

          // 2. 遍历 RedDotType 枚举
          // Object.keys(RedDotType) 会返回 ["RED_DOT_NONE", "0", "RED_DOT_MAIL", "1", ...]
          var enumKeys = Object.keys(RedDotType);
          for (var _i = 0, _enumKeys = enumKeys; _i < _enumKeys.length; _i++) {
            var key = _enumKeys[_i];
            // 过滤掉枚举的反向映射（即过滤掉数字 Key，只保留字符串 Key）
            if (isNaN(Number(key))) {
              var typeValue = RedDotType[key];
              // 过滤掉 NONE 类型（通常不需要对 NONE 发送通知）
              if (typeValue === RedDotType.RED_DOT_NONE) {
                continue;
              }

              // 3. 判断该红点类型是否存在于服务端的 Set 中
              if (gameDataMgr.redDotSet.has(typeValue)) {
                // 在列表中，触发显示红点事件
                gloEvent.emit(EventName.RED_DOT_SHOW, {
                  type: typeValue
                });
              } else {
                // 不在列表中，触发隐藏红点事件
                gloEvent.emit(EventName.RED_DOT_HIDE, {
                  type: typeValue
                });
              }
            }
          }
        }

        /** 玩家数据刷新，需要判断各模块红点是否显示 */;
        _proto.updateReddotByUserInfoData = function updateReddotByUserInfoData() {
          var _gameDataMgr$userInfo7;
          // 判断cash pool是否有奖励：completedBetValue
          // console.log(`pbfixCompletedBetValue  = ${gameDataMgr.userInfo?.pbfixCompletedBetValue?.cToRateNum()}`)
          if (((_gameDataMgr$userInfo7 = gameDataMgr.userInfo) == null || (_gameDataMgr$userInfo7 = _gameDataMgr$userInfo7.pbfixCompletedBetValue) == null ? void 0 : _gameDataMgr$userInfo7.cToRateNum()) > 0) {
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: RedDotType.RED_DOT_CASH_POOL_REWARD
            });
          } else {
            gloEvent.emit(EventName.RED_DOT_HIDE, {
              type: RedDotType.RED_DOT_CASH_POOL_REWARD
            });
          }
        };
        _proto.onDestroy = function onDestroy() {
          var _this$mainScrollViewC2, _this$ttTween2, _this$icRefreshTween;
          if (this.floatingTagEventBound && (_this$mainScrollViewC2 = this.mainScrollViewComp) != null && (_this$mainScrollViewC2 = _this$mainScrollViewC2.node) != null && _this$mainScrollViewC2.isValid) {
            this.mainScrollViewComp.node.off(ScrollView.EventType.SCROLLING, this.onMainScrollViewScrolling, this);
            this.mainScrollViewComp.node.off(ScrollView.EventType.SCROLL_ENDED, this.onMainScrollViewScrolling, this);
          }
          (_this$ttTween2 = this.ttTween) == null || _this$ttTween2.stop();
          (_this$icRefreshTween = this.icRefreshTween) == null || _this$icRefreshTween.stop();
          this.iconPrewarmToken++;
          // this.hideFloatingTagOptimized();
        };

        return PlayPage;
      }(BaseTabPage), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCashPool", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnRechargeNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "freshBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "userInfoBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "settingBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "emailBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "vipLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "vipSpriteNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "avatarNode", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "bonusLabel", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "debugOffsetDay", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "topMoneyUi", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "testBtn", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "btnReload", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "topBonusView", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "withdrawalNode", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "freeBonusWithdNode", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "cashBonusWithdNode", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "tagBox", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "gameList", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "gameBaseItem", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "rootNode", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "imgNoGame", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "bgCurCurrency", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "btnSwitchCurrency", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "gameBaseIcon", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "floatingTagNode", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "installBanner", [_dec31], {
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

System.register("chunks:///_virtual/PromotionPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './VScrollView.ts', './GameDataMgr.ts', './BannerView.ts', './ActivityJumper.ts', './BaseTabPage.ts', './NetConstant.ts', './NGame.ts', './HttpPbFunc.ts', './Turntable.ts', './UIHelper.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventName, inject, VirtualScrollView, gameDataMgr, BannerView, ActivityJumper, BaseTabPage, CMD_SUCCESS, NGame, HttpPbFunc, Turntable, UIHelper, UIPath;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      ActivityJumper = module.ActivityJumper;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      Turntable = module.Turntable;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "804905EeSNEMKf0049dxTW3", "PromotionPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PromotionPage = exports('PromotionPage', (_dec = ccclass('PromotionPage'), _dec2 = inject("vScrollView", VirtualScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(PromotionPage, _BaseTabPage);
        function PromotionPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "vScrollView", _descriptor, _assertThisInitialized(_this));
          _this.actList = [];
          return _this;
        }
        var _proto = PromotionPage.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.create = function create() {};
        _proto.onLoad = function onLoad() {};
        _proto.onEnable = function onEnable() {};
        _proto.open = function open() {
          var _this2 = this;
          this.onMsg(EventName.ON_ACT_LIST_UPDATE, this.refreshUI.bind(this));
          this.vScrollView.renderItemFn = function (itemNode, index) {
            var act = _this2.actList[index];
            itemNode.getComponent(BannerView).setData(act);
          };
          this.vScrollView.onItemClickFn = function (itemNode, index) {
            var act = _this2.actList[index];
            if (act.pbfixActionParams == '7') {
              NGame.loading.show(null, 2.0);
              HttpPbFunc.pbfixWheelActivityInfoReq(null, function (result) {
                NGame.loading.hide();
                if (result.pbfixCode == CMD_SUCCESS) {
                  // NGame.uiManage.open(Turntable) 
                  UIHelper.openUI(Turntable, UIPath.Turntable);
                }
              });
              return;
            }
            ActivityJumper.open(_this2.actList[index]);
          };
          this.refreshUI();
        };
        _proto.refreshUI = function refreshUI() {
          this.actList = gameDataMgr.promotionActivityList;
          this.vScrollView.refreshList(this.actList);
        };
        return PromotionPage;
      }(BaseTabPage), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "vScrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RechargeRolling.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, MKStaticViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "80843tcJztKIqAB5p+q35+P", "RechargeRolling", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 充值轮播列表
       */
      var RechargeRolling = exports('RechargeRolling', (_dec = ccclass('RechargeRolling'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(RechargeRolling, _MKStaticViewBase);
        function RechargeRolling() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nameLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moneyLabel", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = RechargeRolling.prototype;
        _proto.initD = function initD(name, money) {
          this.nameLabel.string = name;
          this.moneyLabel.string = "$" + money;
        };
        return RechargeRolling;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec3], {
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

System.register("chunks:///_virtual/RecordsTab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './NGame.ts', './HttpPbFunc.ts', './Utils.ts', './BaseTabPage.ts', './ShareSearchDataView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, instantiate, inject, NGame, HttpPbFunc, isResponseValid, Utils, safetyNum, BaseTabPage, ShareSearchDataView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }, function (module) {
      ShareSearchDataView = module.ShareSearchDataView;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "08432hmF/VEu4WLPohuTHGH", "RecordsTab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RecordsTab = exports('RecordsTab', (_dec = ccclass('RecordsTab'), _dec2 = inject("searchView", ShareSearchDataView), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(RecordsTab, _BaseTabPage);
        function RecordsTab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "searchView", _descriptor, _assertThisInitialized(_this));
          _this.catTypes = [{
            type: "Invitation Rewards".i18nStr(),
            dataTitles: ["Registration date".i18nStr(), "Username".i18nStr(), "Amount".i18nStr()]
          }, {
            type: "Achievement Rewards".i18nStr(),
            dataTitles: ["Claim time".i18nStr(), "Amount".i18nStr()]
          }, {
            type: "Deposit Rebate".i18nStr(),
            dataTitles: ["Claim time".i18nStr(), "Rate".i18nStr(), "Amount".i18nStr()]
          }, {
            type: "Betting Rebate".i18nStr(),
            dataTitles: ["Claim time".i18nStr(), "Level".i18nStr(), "Rate".i18nStr(), "Bet Amount".i18nStr()]
          }];
          _this.curCatIndex = 0;
          _this.startDate = "";
          _this.endDate = "";
          _this.inviteRewardList = [];
          _this.achievementList = [];
          _this.rechargeRebateList = [];
          _this.betRebateList = [];
          return _this;
        }
        var _proto = RecordsTab.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onEnable = function onEnable() {
          if (this.startDate.length > 0 && this.endDate.length > 0) {
            this.onQryData(1, this.startDate, this.endDate);
          }
        };
        _proto.open = function open() {
          var _this2 = this;
          this.searchView.initView(Utils.extractPropertyValues(this.catTypes, "type"), this.onQryData.bind(this), this.onCatTypeClicked.bind(this));
          this.searchView.setCurCatData(this.curCatData.type, this.curCatData.dataTitles);
          this.searchView.listView.renderItemFn = function (item, index) {
            var elNode = item.child("bg");
            if (elNode.children.length != _this2.curCatData.dataTitles.length) {
              var nodeTextCount = elNode.children.length;
              var valueCount = _this2.curCatData.dataTitles.length;
              var addItem = function addItem() {
                var valueItem = instantiate(item.child("valueItem"));
                valueItem.active = true;
                elNode.addChild(valueItem);
              };
              var addCount = valueCount - nodeTextCount;
              if (nodeTextCount > valueCount) {
                addCount = valueCount;
                elNode.removeAllChildren();
              }
              for (var i = 0; i < addCount; i++) {
                addItem();
              }
            }
            switch (_this2.curCatIndex) {
              case 0:
                var data = _this2.inviteRewardList[index];
                if (data) {
                  var _elNode$children$, _elNode$children$2, _elNode$children$3, _data$pbfixRewardAmou;
                  (_elNode$children$ = elNode.children[0]) == null || _elNode$children$.setText(Utils.formatTime(data.pbfixRegTime, "YYYY-MM-DD HH:mm:ss"));
                  (_elNode$children$2 = elNode.children[1]) == null || _elNode$children$2.setText(data.pbfixReferredNick.ellipsis(8, false));
                  (_elNode$children$3 = elNode.children[2]) == null || _elNode$children$3.setText(Utils.setCurrency(data == null || (_data$pbfixRewardAmou = data.pbfixRewardAmount) == null ? void 0 : _data$pbfixRewardAmou.cToRateNum()));
                }
                break;
              case 1:
                var data2 = _this2.achievementList[index];
                if (data2) {
                  var _elNode$children$4, _elNode$children$5, _data2$pbfixRewardAmo;
                  (_elNode$children$4 = elNode.children[0]) == null || _elNode$children$4.setText(Utils.formatTime(data2.pbfixClaimTime, "YYYY-MM-DD HH:mm:ss"));
                  (_elNode$children$5 = elNode.children[1]) == null || _elNode$children$5.setText(Utils.setCurrency(data2 == null || (_data2$pbfixRewardAmo = data2.pbfixRewardAmount) == null ? void 0 : _data2$pbfixRewardAmo.cToRateNum()));
                }
                break;
              case 2:
                var data3 = _this2.rechargeRebateList[index];
                if (data3) {
                  var _elNode$children$6, _elNode$children$7, _elNode$children$8, _data3$pbfixRewardAmo;
                  (_elNode$children$6 = elNode.children[0]) == null || _elNode$children$6.setText(Utils.formatTime(data3.pbfixClaimTime, "YYYY-MM-DD HH:mm:ss"));
                  (_elNode$children$7 = elNode.children[1]) == null || _elNode$children$7.setText(safetyNum(data3 == null ? void 0 : data3.pbfixRebateRate).cToFeeRateNum() + "%");
                  (_elNode$children$8 = elNode.children[2]) == null || _elNode$children$8.setText(Utils.setCurrency(data3 == null || (_data3$pbfixRewardAmo = data3.pbfixRewardAmount) == null ? void 0 : _data3$pbfixRewardAmo.cToRateNum()));
                }
                break;
              case 3:
                var data4 = _this2.betRebateList[index];
                if (data4) {
                  var _elNode$children$9, _elNode$children$10, _elNode$children$11, _elNode$children$12, _data4$pbfixRewardAmo;
                  (_elNode$children$9 = elNode.children[0]) == null || _elNode$children$9.setText(Utils.formatTime(data4.pbfixClaimTime, "YYYY-MM-DD HH:mm:ss"));
                  (_elNode$children$10 = elNode.children[1]) == null || _elNode$children$10.setText(data4.pbfixLevel);
                  (_elNode$children$11 = elNode.children[2]) == null || _elNode$children$11.setText(safetyNum(data4.pbfixRebateRate).cToFeeRateNum() + "%");
                  (_elNode$children$12 = elNode.children[3]) == null || _elNode$children$12.setText(Utils.setCurrency(data4 == null || (_data4$pbfixRewardAmo = data4.pbfixRewardAmount) == null ? void 0 : _data4$pbfixRewardAmo.cToRateNum()));
                }
                break;
            }
          };
          this.searchView.qryToday();
        };
        _proto.onQryData = function onQryData(curPage, startDate, endDate) {
          var _this3 = this;
          this.startDate = startDate;
          this.endDate = endDate;
          NGame.loading.show(null, null, false);
          this.searchView.nodata.active = false;
          this.searchView.listView.node.active = false;
          var onQryError = function onQryError() {
            _this3.searchView.showNoDataState();
            NGame.tips.toast("Data_Error".i18nStr());
          };
          switch (this.curCatIndex) {
            case 0:
              HttpPbFunc.pbfixReferralInviteRewardRecordReq(this.node, startDate, endDate, curPage, 20, function (result) {
                NGame.loading.hide();
                if (isResponseValid(result)) {
                  var _data$pbfixRecordList, _data$pbfixTotalIncom, _data$pbfixTotalSize;
                  var data = result;
                  _this3.inviteRewardList = (_data$pbfixRecordList = data.pbfixRecordList) != null ? _data$pbfixRecordList : [];
                  _this3.searchView.setTotalNum((_data$pbfixTotalIncom = data.pbfixTotalIncome) != null ? _data$pbfixTotalIncom : 0);
                  _this3.onQryDataFinifshed(_this3.inviteRewardList, (_data$pbfixTotalSize = data.pbfixTotalSize) != null ? _data$pbfixTotalSize : 0);
                } else {
                  onQryError();
                }
              });
              break;
            case 1:
              HttpPbFunc.pbfixReferralAchievementRecordReq(this.node, startDate, endDate, curPage, 20, function (result) {
                NGame.loading.hide();
                if (isResponseValid(result)) {
                  var _data$pbfixRecordList2, _data$pbfixTotalIncom2, _data$pbfixTotalSize2;
                  var data = result;
                  _this3.achievementList = (_data$pbfixRecordList2 = data.pbfixRecordList) != null ? _data$pbfixRecordList2 : [];
                  _this3.searchView.setTotalNum((_data$pbfixTotalIncom2 = data.pbfixTotalIncome) != null ? _data$pbfixTotalIncom2 : 0);
                  _this3.onQryDataFinifshed(_this3.achievementList, (_data$pbfixTotalSize2 = data.pbfixTotalSize) != null ? _data$pbfixTotalSize2 : 0);
                } else {
                  onQryError();
                }
              });
              break;
            case 2:
              HttpPbFunc.pbfixReferralRechargeRebateRecordReq(this.node, startDate, endDate, curPage, 20, function (result) {
                NGame.loading.hide();
                if (isResponseValid(result)) {
                  var _data$pbfixRecordList3, _data$pbfixTotalRebat, _data$pbfixTotalSize3;
                  var data = result;
                  _this3.rechargeRebateList = (_data$pbfixRecordList3 = data.pbfixRecordList) != null ? _data$pbfixRecordList3 : [];
                  _this3.searchView.setTotalNum((_data$pbfixTotalRebat = data.pbfixTotalRebateAmount) != null ? _data$pbfixTotalRebat : 0);
                  _this3.onQryDataFinifshed(_this3.rechargeRebateList, (_data$pbfixTotalSize3 = data.pbfixTotalSize) != null ? _data$pbfixTotalSize3 : 0);
                } else {
                  onQryError();
                }
              });
              break;
            case 3:
              HttpPbFunc.pbfixReferralBetRebateRecordReq(this.node, startDate, endDate, curPage, 20, function (result) {
                NGame.loading.hide();
                if (isResponseValid(result)) {
                  var _data$pbfixRecordList4, _data$pbfixTotalRebat2, _data$pbfixTotalSize4;
                  var data = result;
                  _this3.betRebateList = (_data$pbfixRecordList4 = data.pbfixRecordList) != null ? _data$pbfixRecordList4 : [];
                  _this3.searchView.setTotalNum((_data$pbfixTotalRebat2 = data.pbfixTotalRebateAmount) != null ? _data$pbfixTotalRebat2 : 0);
                  _this3.onQryDataFinifshed(_this3.betRebateList, (_data$pbfixTotalSize4 = data.pbfixTotalSize) != null ? _data$pbfixTotalSize4 : 0);
                } else {
                  onQryError();
                }
              });
              break;
          }
        };
        _proto.onQryDataFinifshed = function onQryDataFinifshed(dataList, totalSize) {
          if (dataList.length > 0) {
            this.searchView.listView.node.active = true;
            this.searchView.listView.refreshList(dataList);
            this.searchView.updateButtomBtnsState(totalSize);
          } else {
            this.searchView.showNoDataState();
          }
        };
        _proto.onCatTypeClicked = function onCatTypeClicked(catIndex) {
          if (this.curCatIndex != catIndex) {
            this.curCatIndex = catIndex;
            this.searchView.setCurCatData(this.curCatData.type, this.curCatData.dataTitles);
            this.onQryData(1, this.startDate, this.endDate);
          }
        };
        _createClass(RecordsTab, [{
          key: "curCatData",
          get: function get() {
            return this.catTypes[this.curCatIndex];
          }
        }]);
        return RecordsTab;
      }(BaseTabPage), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Reddot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKStaticViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Node, Tween, Vec3, tween, RedDotType, EventName, MKStaticViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Node = module.Node;
      Tween = module.Tween;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      RedDotType = module.RedDotType;
      EventName = module.EventName;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "4070dGcYRtPHI8asjNH0vD1", "Reddot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RedDotTypeEnum = Enum(RedDotType);

      /**
       * 红点组件
       */
      var Reddot = exports('Reddot', (_dec = ccclass('Reddot'), _dec2 = property({
        type: RedDotTypeEnum
      }), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(Reddot, _MKStaticViewBase);
        function Reddot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "redDotType", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spriteNode", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Reddot.prototype;
        _proto.onLoad = function onLoad() {
          this.onMsg(EventName.RED_DOT_SHOW, this.onRedDotShow);
          this.onMsg(EventName.RED_DOT_HIDE, this.onRedDotHide);
        };
        _proto.playAnimation = function playAnimation() {
          if (!this.spriteNode.active) return;
          Tween.stopAllByTarget(this.spriteNode);
          // 初始缩放比例
          this.spriteNode.setScale(new Vec3(1, 1, 1));
          tween(this.spriteNode).repeatForever(tween()
          // 快速放大，稍微超过一点点感觉更活泼 (使用 sineOut)
          .to(0.8, {
            scale: new Vec3(1.15, 1.15, 1.15)
          }, {
            easing: 'sineOut'
          })
          // 缓慢回落
          .to(1.0, {
            scale: new Vec3(1.0, 1.0, 1.0)
          }, {
            easing: 'sineIn'
          })
          // 停留一瞬间，增加节奏感
          .delay(0.1)).start();
        };
        _proto.onRedDotShow = function onRedDotShow(data) {
          var type = data.type;
          // console.log("onRedDotShow-->", type);
          if (type !== this.redDotType) return;
          this.spriteNode.active = true;
          this.playAnimation();
        };
        _proto.onRedDotHide = function onRedDotHide(data) {
          var type = data.type;
          // console.log('onRedDotHide---->', type,this.redDotType);

          if (type !== this.redDotType) return;
          Tween.stopAllByTarget(this.spriteNode);
          this.spriteNode.active = false;
        };
        _proto.setType = function setType(type) {
          this.redDotType = type;
        };
        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.RED_DOT_SHOW, this.onRedDotShow);
          this.offMsg(EventName.RED_DOT_HIDE, this.onRedDotHide);
        };
        return Reddot;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "redDotType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteNode", [_dec3], {
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

System.register("chunks:///_virtual/RewardScroller.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './UIController.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCInteger, CCFloat, instantiate, UIOpacity, tween, Vec3, Label, MKStaticViewBase, UIController, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      CCFloat = module.CCFloat;
      instantiate = module.instantiate;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      Vec3 = module.Vec3;
      Label = module.Label;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "bdbc4VtvTpAmYDybM4P3FMz", "RewardScroller", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RewardScroller = exports('RewardScroller', (_dec = ccclass('RewardScroller'), _dec2 = property({
        type: CCInteger
      }), _dec3 = property({
        tooltip: ""
      }), _dec4 = property({
        type: [CCFloat]
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(RewardScroller, _MKStaticViewBase);
        function RewardScroller() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "listNumer", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "desc", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moneyChiZi", _descriptor3, _assertThisInitialized(_this));
          _this.allNode = null;
          _this.posY = [];
          _this.ddt = 1;
          return _this;
        }
        var _proto = RewardScroller.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.start = function start() {
          if (this.listNumer % 2 == 0) {
            this.listNumer = this.listNumer + 1;
          }
          var base = 50;
          var num = Math.floor(this.listNumer / 2) * base;
          for (var index = 0; index < this.listNumer; index++) {
            var ziBase = instantiate(this.allNode.ziBase);
            ziBase.parent = this.allNode.list;
            ziBase.active = true;
            ziBase.setPosition(0, num - index * base);
            this.posY.push(num - index * base);
            this.setNum(ziBase);
            ziBase.active = !(index == 0 || index == this.listNumer - 1);
            ziBase.setSiblingIndex(index);
          }
        };
        _proto.setNum = function setNum(node) {
          var name = Utils.setRandomDeposit();
          var TopDesc = node.getChildByName("TopDesc");
          var moneyDesc = node.getChildByName("moneyDesc");
          TopDesc.setText(name + " " + this.desc);
          var money = this.moneyChiZi[Utils.random(0, this.moneyChiZi.length - 1)];
          moneyDesc.setText(Utils.changeMoneyUnit(money, 1));
        };
        _proto.gunFunc = function gunFunc() {
          var _this2 = this;
          var descHistory = [];
          this.setNum(this.allNode.list.children[this.listNumer - 1]);
          this.allNode.list.children[this.listNumer - 1].active = true;
          this.allNode.list.children[this.listNumer - 1].getComponent(UIOpacity).opacity = 0;
          tween(this.allNode.list.children[this.listNumer - 1].getComponent(UIOpacity)).to(0.2, {
            opacity: 255
          }).start();
          var _loop = function _loop(index) {
            if (index > 0) {
              var item = _this2.allNode.list.children[index];
              var posY = _this2.posY[index - 1];
              descHistory.push({
                top: _this2.allNode.list.children[index].getChildByName("TopDesc").getText(),
                end: _this2.allNode.list.children[index].getChildByName("moneyDesc").getText()
              });
              tween(item).to(0.2, {
                position: new Vec3(0, posY, 0)
              }).call(function () {
                if (index == _this2.listNumer - 1) {
                  for (var jj = 0; jj < _this2.allNode.list.children.length; jj++) {
                    _this2.allNode.list.children[jj].y = _this2.posY[jj];
                    _this2.allNode.list.children[jj].active = !(jj == 0 || jj == _this2.listNumer - 1);
                    if (descHistory[jj]) {
                      _this2.allNode.list.children[jj].getChildByName("TopDesc").getComponent(Label).string = descHistory[jj].top;
                      _this2.allNode.list.children[jj].getChildByName("moneyDesc").getComponent(Label).string = descHistory[jj].end;
                    } else {
                      _this2.setNum(_this2.allNode.list.children[jj]);
                    }
                  }
                }
              }).start();
            }
          };
          for (var index = 0; index < this.allNode.list.children.length; index++) {
            _loop(index);
          }
        };
        _proto.update = function update(deltaTime) {
          if (this.ddt < 0) {
            this.ddt = Utils.random(3, 6);
            this.gunFunc();
          }
          this.ddt -= deltaTime;
        };
        return RewardScroller;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listNumer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "desc", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "Deposited";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moneyChiZi", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardsTab.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './VScrollView.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts', './BaseTabPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UIOpacity, Button, BundleName, inject, VirtualScrollView, NGame, gameDataMgr, HttpPbFunc, isResponseValid, pbfixClaimedStatus, safetyNum, BaseTabPage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
    }, function (module) {
      BundleName = module.BundleName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixClaimedStatus = module.pbfixClaimedStatus;
    }, function (module) {
      safetyNum = module.safetyNum;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "98282bNuvpIbJrpQDNKFvji", "RewardsTab", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RewardsTab = exports('RewardsTab', (_dec = ccclass('RewardsTab'), _dec2 = inject("listView", VirtualScrollView), _dec3 = inject("nodata", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(RewardsTab, _BaseTabPage);
        function RewardsTab() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "listView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodata", _descriptor2, _assertThisInitialized(_this));
          _this.dataList = [];
          return _this;
        }
        var _proto = RewardsTab.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onEnable = function onEnable() {
          this.reloadData();
        };
        _proto.open = function open() {
          var _this2 = this;
          this.listView.renderItemFn = function (item, index) {
            var _referralCfg$pbfixInv, _data$pbfixActualInvi;
            var data = _this2.dataList[index];
            var referralCfg = gameDataMgr.referralData.pbfixAchievementConfigList.find(function (d) {
              return d.pbfixId == data.pbfixRewardConfigId;
            });
            var targetInviteNum = (_referralCfg$pbfixInv = referralCfg == null ? void 0 : referralCfg.pbfixInviteCount) != null ? _referralCfg$pbfixInv : 0;
            var rewardNum = safetyNum(referralCfg == null ? void 0 : referralCfg.pbfixRewardAmount).cToRateNum();
            item.child("icon").loadImg("Share/img/dj_" + (index + 1), BundleName.HALL);
            item.child("title").setText("Over valid referral in total".i18nStr(["" + targetInviteNum]));
            item.child("money").setText(rewardNum);
            item.child("layout").child("inviteNum").setText((_data$pbfixActualInvi = data.pbfixActualInviteCount) != null ? _data$pbfixActualInvi : 0);
            item.child("layout").child("totalNum").setText("/" + targetInviteNum);
            item.child("Completed").active = data.pbfixStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
            var btnAvailable = item.child("btnAvailable");
            btnAvailable.active = data.pbfixStatus != pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED;
            if (btnAvailable.active) {
              var canClaim = data.pbfixStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE;
              btnAvailable.getComponent(UIOpacity).opacity = canClaim ? 255 : 100;
              btnAvailable.getComponent(Button).interactable = canClaim;
              if (canClaim) {
                _this2.onClicked(btnAvailable, function () {
                  _this2.getTaskReward(data.pbfixTaskId, rewardNum);
                });
              } else {
                _this2.offClicked(btnAvailable);
              }
            }
          };
        };
        _proto.getTaskReward = function getTaskReward(taskId, rewardNum) {
          var _this3 = this;
          HttpPbFunc.pbfixReferralTaskRewardReq(this.node, taskId, function (result) {
            NGame.dialog.showGetRewardDialog({
              rewardNum: rewardNum
            });
            _this3.reloadData();
          });
        };
        _proto.initUi = function initUi() {
          this.dataList = gameDataMgr.referralData.pbfixTaskList || [];
          if (this.dataList.length > 0) {
            this.listView.node.active = true;
            this.listView.refreshList(this.dataList);
          } else {
            this.nodata.active = false;
          }
        };
        _proto.reloadData = function reloadData() {
          var _this4 = this;
          this.nodata.active = false;
          NGame.loading.show(null, null, false);
          HttpPbFunc.pbfixReferralDataReq(this.node, function (result) {
            NGame.loading.hide();
            if (isResponseValid(result)) {
              _this4.initUi();
            } else {
              _this4.nodata.active = true;
            }
          });
        };
        return RewardsTab;
      }(BaseTabPage), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodata", [_dec3], {
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

System.register("chunks:///_virtual/SelBalanceTypeDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './GoogleAnatytics.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, UIOpacity, Tween, Vec3, StorageKey, EventName, MoneyType, inject, gloEvent, MKViewBase, NGame, gameDataMgr, GoogleAnalytics, GAEvent, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Tween = module.Tween;
      Vec3 = module.Vec3;
    }, function (module) {
      StorageKey = module.StorageKey;
      EventName = module.EventName;
      MoneyType = module.MoneyType;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "16263SSTnFBxbnnxGnZVbrV", "SelBalanceTypeDialog", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SelBalanceTypeDialog = exports('SelBalanceTypeDialog', (_dec = ccclass('SelBalanceTypeDialog'), _dec2 = inject("bg/btn_close", Node), _dec3 = inject("bg/btn_confirm", Node), _dec4 = inject("bg/node_label_cursel/label_cur_type", Node), _dec5 = inject("bg/node_item_type/item_cas/node_layout/label_balance", Node), _dec6 = inject("bg/node_item_type/item_bonus/node_layout/label_balance", Node), _dec7 = inject("bg/node_item_type/item_cas", Node), _dec8 = inject("bg/node_item_type/item_bonus", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(SelBalanceTypeDialog, _MKViewBase);
        function SelBalanceTypeDialog() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "confirmBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "curBalanceLabelNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cashBalanceLabelNode", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonusBalanceLabelNode", _descriptor5, _assertThisInitialized(_this));
          // cash balance Item
          _initializerDefineProperty(_this, "cashBalanceItemNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bonusBalanceItemNode", _descriptor7, _assertThisInitialized(_this));
          // 底图纹理列表
          // @property([SpriteFrame]) 
          // selectIcons: SpriteFrame[] = []; // 对应两个币种的选中状态: 0: 未选中, 1: 选中状态
          _this.curSelCurrencyType = 0;
          // 当前选中的币种类型
          _this.confirmCallback = null;
          return _this;
        }
        var _proto = SelBalanceTypeDialog.prototype;
        _proto.open = function open() {
          GoogleAnalytics.track(GAEvent.DIALOG_SELECT_BALANCE);
          NGame.storage.set(StorageKey.HAS_SHOW_SEL_BALANCE_TYPE_DIALOG, true); // 标记为已展示过
          this.initUI();
          this.onClickEvent();
          this.confirmCallback = this.initData.confirmCallback;
          this.onMsg(EventName.SWITICH_CURRENCY_BY_SWITCHER, this.onSwitchCurrencyBySwitcher);
          gloEvent.emit(EventName.SHOW_SWITICH_CURRENCY_BUBBLE_ANI);
        };
        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.SWITICH_CURRENCY_BY_SWITCHER, this.onSwitchCurrencyBySwitcher);
        };
        _proto.initUI = function initUI() {
          var _gameDataMgr$userInfo, _gameDataMgr$userInfo2;
          this.cashBalanceLabelNode.setText("$ " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo.pbfixBalance).cToRateNum());
          this.bonusBalanceLabelNode.setText(" " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixBonus).cToRateNum());

          // 2. 初始化选中状态（从存储获取或默认Cash）
          this.curSelCurrencyType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          this.refreshUI(true);
        };
        _proto.onClickEvent = function onClickEvent() {
          var _this2 = this;
          this.onClicked(this.closeBtn, function () {
            _this2.closeAndDestroy();
          });
          this.onClicked(this.confirmBtn, function () {
            _this2.onClickConfirmBtn();
          });
          this.onClicked(this.cashBalanceItemNode, function () {
            _this2.onBtnSelect(MoneyType.MONEY_TYPE_BALANCE);
          });
          this.onClicked(this.bonusBalanceItemNode, function () {
            _this2.onBtnSelect(MoneyType.MONEY_TYPE_FREE_BONUS);
          });
        }

        // 点击切换币种
        ;

        _proto.onBtnSelect = function onBtnSelect(mType) {
          if (this.curSelCurrencyType == mType) {
            return;
          }
          this.curSelCurrencyType = mType;
          NGame.storage.set(StorageKey.CUR_SEL_CURRENCY, this.curSelCurrencyType);
          this.refreshUI();

          // 发送切换事件
          gloEvent.emit(EventName.SWITICH_CURRENCY_BY_DIALOG, {
            currencyType: this.curSelCurrencyType
          });
        };
        _proto.refreshUI = function refreshUI(isInit) {
          if (isInit === void 0) {
            isInit = false;
          }
          var curCurrencyStr = this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE ? "Cash Balance" : "Bonus Balance";
          this.curBalanceLabelNode.setText(curCurrencyStr.i18nStr());

          // this.cashBalanceItemNode.getComponent(Sprite).spriteFrame = this.selectIcons[this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE ? 1 : 0];
          // this.bonusBalanceItemNode.getComponent(Sprite).spriteFrame = this.selectIcons[this.curSelCurrencyType === MoneyType.MONEY_TYPE_FREE_BONUS ? 1 : 0];     

          this.cashBalanceItemNode.child("bg_item_sel_btype").active = this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE;
          this.bonusBalanceItemNode.child("bg_item_sel_btype").active = this.curSelCurrencyType === MoneyType.MONEY_TYPE_FREE_BONUS;
          if (isInit) {
            tween(this.cashBalanceItemNode.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
            tween(this.bonusBalanceItemNode.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
          }

          // this.cashBalanceItemNode.getComponent(Button).interactable = true;
          // this.bonusBalanceItemNode.getComponent(Button).interactable = true;

          // 缩放动效（呼吸效果）
          // this.scheduleOnce(()=>{
          //     Tween.stopAllByTarget(this.bonusBalanceItemNode);
          //     Tween.stopAllByTarget(this.cashBalanceItemNode);

          // if (this.curSelCurrencyType === MoneyType.MONEY_TYPE_BALANCE) {
          //     this.cashBalanceItemNode.getComponent(Button).interactable = false;
          // this.showTypeItemAni(this.cashBalanceItemNode);
          // }else{
          //     this.bonusBalanceItemNode.getComponent(Button).interactable = false;
          // this.showTypeItemAni(this.bonusBalanceItemNode);
          // }
          // },delayShowItemAni)
        };

        _proto.onClickConfirmBtn = function onClickConfirmBtn() {
          var _this$confirmCallback;
          this.closeAndDestroy();
          (_this$confirmCallback = this.confirmCallback) == null || _this$confirmCallback.call(this);
        };
        _proto.showTypeItemAni = function showTypeItemAni(node) {
          var duration = 1.0;
          var maxScale = 1.04;
          var minScale = 0.99;
          Tween.stopAllByTarget(node);
          tween(node).repeatForever(tween().to(duration, {
            scale: new Vec3(maxScale, maxScale, 1)
          }, {
            easing: 'sineInOut'
          }).delay(0.3).to(duration, {
            scale: new Vec3(minScale, minScale, 1)
          }, {
            easing: 'sineInOut'
          })).start();
        };
        _proto.onSwitchCurrencyBySwitcher = function onSwitchCurrencyBySwitcher() {
          var latestSelType = NGame.storage.getNumber(StorageKey.CUR_SEL_CURRENCY, 0);
          if (this.curSelCurrencyType == latestSelType) {
            return;
          }
          this.curSelCurrencyType = latestSelType;
          this.refreshUI();
        };
        return SelBalanceTypeDialog;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "confirmBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "curBalanceLabelNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cashBalanceLabelNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bonusBalanceLabelNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cashBalanceItemNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bonusBalanceItemNode", [_dec8], {
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

System.register("chunks:///_virtual/SharePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTabBtn.ts', './Constant.ts', './Decorators.ts', './NGame.ts', './IncomesTab.ts', './InviteFriendsTab.ts', './InviteListTab.ts', './RecordsTab.ts', './RewardsTab.ts', './BaseTabPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, color, UITransform, GloTabBtn, ShareTabIndex, inject, NGame, IncomesTab, InviteFriendsTab, InviteListTab, RecordsTab, RewardsTab, BaseTabPage;
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
      color = module.color;
      UITransform = module.UITransform;
    }, function (module) {
      GloTabBtn = module.GloTabBtn;
    }, function (module) {
      ShareTabIndex = module.ShareTabIndex;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      IncomesTab = module.IncomesTab;
    }, function (module) {
      InviteFriendsTab = module.InviteFriendsTab;
    }, function (module) {
      InviteListTab = module.InviteListTab;
    }, function (module) {
      RecordsTab = module.RecordsTab;
    }, function (module) {
      RewardsTab = module.RewardsTab;
    }, function (module) {
      BaseTabPage = module.BaseTabPage;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "0fc01989TRIUoPKxCD7z7vY", "SharePage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SharePage = exports('SharePage', (_dec = ccclass('SharePage'), _dec2 = inject("title", Node), _dec3 = inject("tabBtns", Node), _dec4 = inject("pageContent", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseTabPage) {
        _inheritsLoose(SharePage, _BaseTabPage);
        function SharePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseTabPage.call.apply(_BaseTabPage, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tabBtns", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pageContainer", _descriptor3, _assertThisInitialized(_this));
          _this.pageList = [{
            index: ShareTabIndex.InviteFriends,
            page: InviteFriendsTab
          }, {
            index: ShareTabIndex.Rewards,
            page: RewardsTab
          }, {
            index: ShareTabIndex.Incomes,
            page: IncomesTab
          }, {
            index: ShareTabIndex.Records,
            page: RecordsTab
          }, {
            index: ShareTabIndex.InviteList,
            page: InviteListTab
          }];
          _this.selectedColor = color("#0B6BFE");
          _this.noSelectedColor = color("#000000");
          _this.curPageIndex = -1;
          return _this;
        }
        var _proto = SharePage.prototype;
        _proto.onAction = function onAction(acton) {};
        _proto.onLoad = function onLoad() {};
        _proto.open = function open() {
          this.node.getComponent(UITransform).height = this.node.parent.contentSize().height;
          this.pageContainer.getComponent(UITransform).height = this.node.contentSize().height - this.title.contentSize().height - this.tabBtns.contentSize().height;
          this.addClickEvent();
          this.switchPage(0);
        };
        _proto.switchPage = /*#__PURE__*/function () {
          var _switchPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(switchIndex, acton) {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.updateSwitchBtnState(switchIndex);
                  this.pageList.forEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(p, tabIndex) {
                    var _page2;
                    var page, _page, _page$getComponent;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          page = NGame.uiManage.get(p.page);
                          if (!page) {
                            _context.next = 5;
                            break;
                          }
                          // page.node.active = tabIndex == switchIndex
                          if (tabIndex != ShareTabIndex.InviteFriends) {
                            page.node.active = tabIndex == switchIndex;
                          } else if (switchIndex == ShareTabIndex.InviteFriends) {
                            (_page = page) == null || _page.onPageShow();
                          }
                          _context.next = 11;
                          break;
                        case 5:
                          if (!(tabIndex == switchIndex)) {
                            _context.next = 11;
                            break;
                          }
                          if (switchIndex == ShareTabIndex.InviteFriends) {
                            NGame.loading.show(null, null, false);
                          }
                          _context.next = 9;
                          return NGame.uiManage.open(_this2.pageList[switchIndex].page, {
                            parent: _this2.pageContainer
                          });
                        case 9:
                          page = _context.sent;
                          if (switchIndex == ShareTabIndex.InviteFriends) {
                            NGame.loading.hide();
                          }
                        case 11:
                          if (acton && ((_page2 = page) == null || (_page2 = _page2.node) == null ? void 0 : _page2.active) === true) {
                            (_page$getComponent = page.getComponent(BaseTabPage)) == null || _page$getComponent.onAction(acton);
                          }
                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  })));
                  this.curPageIndex = switchIndex;
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function switchPage(_x, _x2) {
            return _switchPage.apply(this, arguments);
          }
          return switchPage;
        }();
        _proto.addClickEvent = function addClickEvent() {
          var _this3 = this;
          // 底部switch按钮切换页面
          // const btnNodes = this.tabBtns.children.filter(node => node.name.startsWith("btn"))
          // for (let btnIndex = 0; btnIndex < btnNodes.length; btnIndex++) {
          //     this.onClicked(btnNodes[btnIndex], this.switchPage.bind(this, btnIndex))
          // }
          this.tabBtns.children.forEach(function (btn, idx) {
            _this3.onClicked(btn, _this3.switchPage.bind(_this3, idx));
          });
        };
        _proto.updateSwitchBtnState = function updateSwitchBtnState(index) {
          this.tabBtns.children.forEach(function (btn, idx) {
            btn.getComponent(GloTabBtn).setSelect(idx == index);
          });
          // const btnNodes = this.tabBtns.children.filter(node => node.name.startsWith("btn"))
          // for (let btnIndex = 0; btnIndex < btnNodes.length; btnIndex++) {
          //     btnNodes[btnIndex].child(`name`).getComponent(Label).color = btnIndex == index ? this.selectedColor : this.noSelectedColor
          // }
        };

        return SharePage;
      }(BaseTabPage), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tabBtns", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pageContainer", [_dec4], {
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

System.register("chunks:///_virtual/ShareSearchDataView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DatePicker2.ts', './Decorators.ts', './VScrollView.ts', './MKStaticViewBase.ts', './NGame.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, color, instantiate, v3, tween, UIOpacity, Button, DatePicker2, inject, VirtualScrollView, MKStaticViewBase, NGame, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      color = module.color;
      instantiate = module.instantiate;
      v3 = module.v3;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
    }, function (module) {
      DatePicker2 = module.DatePicker2;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;
      cclegacy._RF.push({}, "9973exQt/pCLYk5esPtrlp7", "ShareSearchDataView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShareSearchDataView = exports('ShareSearchDataView', (_dec = ccclass('ShareSearchDataView'), _dec2 = property({
        type: Prefab
      }), _dec3 = inject("top/btnDate/labDate", Node), _dec4 = inject("top/btnCat", Node), _dec5 = inject("top/btnDate", Node), _dec6 = inject("top/btnToday", Node), _dec7 = inject("catsNode", Node), _dec8 = inject("catsNode/catNameItem", Node), _dec9 = inject("dataContent/titles", Node), _dec10 = inject("dataContent/titleItem", Node), _dec11 = inject("dataContent/totalNode", Node), _dec12 = inject("dataContent/bottomBtns", Node), _dec13 = inject("dataContent/bottomBtns/leftBtn", Node), _dec14 = inject("dataContent/bottomBtns/rightBtn", Node), _dec15 = inject("dataContent/nodata", Node), _dec16 = inject("dataContent/listView", VirtualScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(ShareSearchDataView, _MKStaticViewBase);
        function ShareSearchDataView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "calendarPre", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labDate", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnCat", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDate", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnToday", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "catsNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "catNameItem", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "dataTitlesNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "titleItem", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalNode", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottomBtns", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "leftBtn", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rightBtn", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodata", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "listView", _descriptor15, _assertThisInitialized(_this));
          _this.calendarNode = null;
          _this.selectedStartDate = null;
          _this.selectedEndDate = null;
          _this.startDate = "";
          _this.endDate = "";
          // limit: number = 20;
          _this.selectedDayColor = color("#1689E1");
          _this.defaultDayColor = color("#A5A5A5");
          _this.isloadingData = false;
          _this.curPage = 1;
          _this.maxPage = 0;
          _this.time = 0;
          _this.dayIndx = 0;
          _this.curCatIndex = 0;
          _this.dataList = [];
          _this.onQryData = void 0;
          _this.onCatTypeClicked = void 0;
          return _this;
        }
        var _proto = ShareSearchDataView.prototype;
        _proto.initView = function initView(catTypes, qryDataFnc, onCatTypeClicked) {
          this.initCatTypesList(catTypes);
          this.onQryData = qryDataFnc;
          this.onCatTypeClicked = onCatTypeClicked;
        };
        _proto.initCatTypesList = function initCatTypesList(catTypes) {
          var _this2 = this;
          catTypes.forEach(function (catType, index) {
            var catItem = instantiate(_this2.catNameItem);
            catItem.active = true;
            catItem.setText(catType);
            _this2.catsNode.child("catList").addChild(catItem);
            _this2.onClicked(catItem, function () {
              _this2.closeCatList();
              _this2.onCatTypeClicked == null || _this2.onCatTypeClicked(index);
            });
          });
        };
        _proto.setCurCatData = function setCurCatData(type, dataTitles) {
          var _this3 = this;
          if (dataTitles === void 0) {
            dataTitles = null;
          }
          this.btnCat.child("catName").setText(type);
          if (dataTitles && dataTitles.length > 0) {
            this.dataTitlesNode.removeAllChildren();
            dataTitles.forEach(function (title, index) {
              var catItem = instantiate(_this3.titleItem);
              catItem.active = true;
              catItem.setText(title);
              _this3.dataTitlesNode.addChild(catItem);
            });
          }
        };
        _proto.open = function open() {
          var _this4 = this;
          // this.startDate = Utils.formatTime(new Date().getTime(), 'YYYY-MM-DD');
          // this.endDate = Utils.formatTime(new Date().getTime(), 'YYYY-MM-DD');

          this.onClicked(this.btnCat, this.openCatList.bind(this), false, 0.1, false);
          this.onClicked(this.catsNode, this.closeCatList.bind(this), false, 0.1, false);
          this.onClicked(this.btnDate, this.clickCalendar.bind(this), false, 0.1, false);
          this.onClicked(this.btnToday, function () {
            _this4.qryToday();
          });
          this.onClicked(this.leftBtn, this.clickLeft.bind(this));
          this.onClicked(this.rightBtn, this.clickRight.bind(this));
        };
        _proto.qryToday = function qryToday() {
          // const todayDate = Utils.formatTime(new Date().getTime(), 'YYYY-MM-DD');
          // if (this.startDate != todayDate || this.endDate != todayDate) {
          //     this.onSelectDate(new Date(), new Date());
          // }
          this.onSelectDate(new Date(), new Date());
        };
        _proto.openCatList = function openCatList() {
          this.catsNode.active = true;
          this.catsNode.child("catList").worldPosition = this.btnCat.worldPosition.clone().add(v3(0, -40));
          tween(this.catsNode.child("catList")).to(0.1, {
            scale: v3(1, 1, 1)
          }).bindNodeState(false).start();
        };
        _proto.closeCatList = function closeCatList() {
          var _this5 = this;
          tween(this.catsNode.child("catList")).to(0.1, {
            scale: v3(1, 0, 1)
          }).bindNodeState(false).call(function () {
            _this5.catsNode.active = false;
          }).start();
        }

        /**点击日历 */;
        _proto.clickCalendar = function clickCalendar() {
          var _this6 = this;
          if (!this.calendarNode) {
            this.calendarNode = instantiate(this.calendarPre);
            this.calendarNode.parent = this.node;
            this.calendarNode.getComponent(DatePicker2).setSelectCall(function (startDate, endDate) {
              _this6.onSelectDate(startDate, endDate);
            });
          }
          this.calendarNode.active = true;
          this.calendarNode.getComponent(DatePicker2).initCalendar(this.selectedStartDate, this.selectedEndDate);
        };
        _proto.onSelectDate = function onSelectDate(startDate, endDate) {
          var _this$onQryData;
          this.selectedStartDate = startDate;
          this.selectedEndDate = endDate;
          this.startDate = Utils.formatTime(startDate.getTime(), 'YYYY-MM-DD');
          this.endDate = Utils.formatTime(endDate.getTime(), 'YYYY-MM-DD');
          this.updateLabDate();
          (_this$onQryData = this.onQryData) == null || _this$onQryData.call(this, 1, this.startDate, this.endDate);
        };
        _proto.updateLabDate = function updateLabDate() {
          this.labDate.setText(Utils.formatTime(this.selectedStartDate.getTime(), 'MM/DD') + " - " + Utils.formatTime(this.selectedEndDate.getTime(), 'MM/DD'));
        };
        _proto.clickLeft = function clickLeft() {
          var _this$onQryData2;
          if (this.curPage <= 1) return;
          this.curPage--;
          (_this$onQryData2 = this.onQryData) == null || _this$onQryData2.call(this, this.curPage, this.startDate, this.endDate);
        };
        _proto.clickRight = function clickRight() {
          var _this$onQryData3;
          // if (this.dataList.length < this.limit) return;
          this.curPage++;
          (_this$onQryData3 = this.onQryData) == null || _this$onQryData3.call(this, this.curPage, this.startDate, this.endDate);
        };
        _proto.setTotalNum = function setTotalNum(totalNum) {
          this.totalNode.active = true;
          this.totalNode.child("value").setText(Utils.setCurrency(totalNum.cToRateNum()));
        };
        _proto.showNoDataState = function showNoDataState() {
          this.listView.node.active = false;
          NGame.loading.hide();
          this.nodata.active = true;
          this.totalNode.active = false;
          this.bottomBtns.active = false;
        };
        _proto.updateButtomBtnsState = function updateButtomBtnsState(totalSize) {
          this.bottomBtns.active = true;
          this.bottomBtns.child("pageNum").setText(this.curPage);
          var leftBtn = this.bottomBtns.child("leftBtn");
          var leftBtnCanClick = this.curPage > 1;
          leftBtn.getComponent(UIOpacity).opacity = leftBtnCanClick ? 255 : 150;
          leftBtn.getComponent(Button).interactable = leftBtnCanClick;
          var rightBtn = this.bottomBtns.child("rightBtn");
          var rightBtnCanClick = this.curPage < totalSize / 20;
          rightBtn.getComponent(UIOpacity).opacity = rightBtnCanClick ? 255 : 150;
          rightBtn.getComponent(Button).interactable = rightBtnCanClick;
        };
        return ShareSearchDataView;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "calendarPre", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labDate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnCat", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnDate", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnToday", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "catsNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "catNameItem", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dataTitlesNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "titleItem", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "totalNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "bottomBtns", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "leftBtn", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rightBtn", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "nodata", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec16], {
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

System.register("chunks:///_virtual/ShareTableView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Layout, UITransform, instantiate, NodePool, MKStaticViewBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Layout = module.Layout;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9ce8aDZZCJNBYaqQ+W/8opg", "ShareTableView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShareTableView = exports('ShareTableView', (_dec = ccclass('ShareTableView'), _dec(_class = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(ShareTableView, _MKStaticViewBase);
        function ShareTableView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _this.isIniting = false;
          _this.tableItemPool = new NodePool();
          return _this;
        }
        var _proto = ShareTableView.prototype;
        // initTableView(rowNum: number, colNum: number) {
        //     if (this.isIniting) {
        //         return;
        //     }
        //     this.isIniting = true;
        //     const layout = this.node.child(`layout`);
        //     // layout.getComponent(Layout).constraint = Layout.Constraint.FIXED_ROW;
        //     // layout.getComponent(Layout).constraintNum = rowNum;
        //     layout.getComponent(Layout).constraint = Layout.Constraint.FIXED_COL;
        //     layout.getComponent(Layout).constraintNum = colNum;
        //     const paddingLeft = layout.getComponent(Layout).paddingLeft;
        //     const paddingRight = layout.getComponent(Layout).paddingRight;
        //     const spacingX = layout.getComponent(Layout).spacingX;
        //     layout.removeAllChildren();
        //     const tempItem = this.node.child(`tempItem`);
        //     tempItem.getComponent(UITransform).width = (this.node.contentSize().width - (paddingLeft + paddingRight + spacingX * (colNum - 1))) / colNum;
        //     const count = rowNum * colNum;
        //     for (let i = 0; i < count; i++) {
        //         const item = instantiate(tempItem);
        //         item.active = true;
        //         // item.getComponent(UITransform).width = (this.node.contentSize().width - 20 * 2) / this._colNum;
        //         layout.addChild(item);
        //     }
        //     this.isIniting = false;
        // }
        _proto.initTableView = function initTableView(tableItemPool, data, colNum) {
          if (colNum === void 0) {
            colNum = 3;
          }
          this.tableItemPool = tableItemPool;
          if (this.isIniting) {
            return;
          }
          this.isIniting = true;
          var layout = this.node.child("layout");
          layout.getComponent(Layout).constraint = Layout.Constraint.FIXED_COL;
          layout.getComponent(Layout).constraintNum = colNum;
          var paddingLeft = layout.getComponent(Layout).paddingLeft;
          var paddingRight = layout.getComponent(Layout).paddingRight;
          var spacingX = layout.getComponent(Layout).spacingX;
          // layout.removeAllChildren();
          // const tempItem = this.node.child(`tempItem`);
          this.recyleAllItemNode();
          var tempItem = this.getItemNode();
          tempItem.getComponent(UITransform).width = (this.node.contentSize().width - (paddingLeft + paddingRight + spacingX * (colNum - 1))) / colNum;
          for (var i = 0; i < data.length; i++) {
            var item = instantiate(tempItem);
            item.active = true;
            item.child("value").setText(data[i]);
            layout.addChild(item);
          }
          this.isIniting = false;
        };
        _proto.getItemNode = function getItemNode() {
          var itemNode = this.tableItemPool.get();
          if (!itemNode) {
            itemNode = instantiate(this.node.child("tempItem"));
          }
          return itemNode;
        };
        _proto.recyleAllItemNode = function recyleAllItemNode() {
          var layout = this.node.child("layout");
          if (layout.children.length > 0) {
            for (var index = layout.children.length - 1; index >= 0; index--) {
              this.tableItemPool.put(layout.children[index]);
            }
          }
        };
        return ShareTableView;
      }(MKStaticViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SidebarPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './VScrollView.ts', './MKStaticViewBase.ts', './GameDataMgr.ts', './UIController.ts', './BannerView.ts', './ActivityJumper.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, tween, EventName, inject, VirtualScrollView, MKStaticViewBase, gameDataMgr, UIController, BannerView, ActivityJumper;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      tween = module.tween;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      BannerView = module.BannerView;
    }, function (module) {
      ActivityJumper = module.ActivityJumper;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "43b8chZNiJGva79t4zGDFhN", "SidebarPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 侧边栏活动（右侧抽屉活动栏）
      var SidebarPage = exports('SidebarPage', (_dec = ccclass('SidebarPage'), _dec2 = inject("moveNode/ScrollView", VirtualScrollView), _dec3 = inject("mask", Node), _dec4 = inject("moveNode/downBtn", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(SidebarPage, _MKStaticViewBase);
        function SidebarPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scrollView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mask", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moveDownBtn", _descriptor3, _assertThisInitialized(_this));
          // 滑动到最底部
          _this.data = null;
          _this.allNode = null;
          /** 是否正在移动 */
          _this.isMove = false;
          return _this;
        }
        var _proto = SidebarPage.prototype;
        _proto.open = function open() {
          this.allNode.mask.setPosition(v3(this.node.contentSize().width, 0, 0));
          this.allNode.moveNode.setPosition(v3(this.node.contentSize().width / 2 + this.allNode.moveNode.contentSize().width / 2, 0, 0));
          this.allNode.sidebarBtn.setPosition(v3(this.node.contentSize().width / 2 - this.allNode.sidebarBtn.contentSize().width / 2, 0, 0));
          this.allNode.block.active = false;
          this.allNode.mask.active = false;
          this.allNode.moveNode.active = false;
          this.onMsg(EventName.ON_ACT_LIST_UPDATE, this.refreshUI.bind(this));
          this.onMsg(EventName.REQUEST_CLOSE_PAGE_SIDEBAR, this.onCloseSidebarPage.bind(this));
        };
        _proto.onEnable = function onEnable() {
          if (!this.allNode) {
            this.allNode = UIController.getAllChildrenMap(this.node);
          }
          this.onClicked(this.allNode.sidebarBtn, this.onSidebarBtnClick.bind(this));
          this.onClicked(this.mask, this.onSidebarBtnClick.bind(this), true, 0.1, false);
          this.onClicked(this.moveDownBtn, this.moveDown.bind(this), true, 1.0, false);
          // this.onClicked(this.allNode.JackPot, this.onJackPotClick.bind(this))
        };

        _proto.onDisable = function onDisable() {
          this.offClicked(this.allNode.sidebarBtn);
          // this.offClicked(this.allNode.JackPot)
        }

        /** 点击JackPot按钮 */;
        _proto.onJackPotClick = function onJackPotClick() {
          // GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.JackPotPop);
        }

        // 滑动到最底部
        ;

        _proto.moveDown = function moveDown() {
          this.scrollView.scrollToBottom(true, 0.01); // todo 会闪烁一下，需要优化！
        }

        /** 点击侧边栏按钮 */;
        _proto.onSidebarBtnClick = function onSidebarBtnClick() {
          if (this.isMove) return;
          if (this.allNode.ic_o.active) {
            // this.allNode.jiantou.setScale(1, 1, 1);
            this.allNode.ic_o.active = false;
            this.allNode.block.active = true;
            this.openSidebar();
            this.refreshUI();
          } else {
            this.allNode.ic_o.active = true;
            // this.allNode.jiantou.setScale(-1, 1, 1);
            this.closeSidebar();
          }
        };
        _proto.onCloseSidebarPage = function onCloseSidebarPage() {
          if (this.isMove) return;
          if (this.allNode.ic_o.active) {
            return;
          }
          this.onSidebarBtnClick();
        }

        /**打开侧边栏 */;
        _proto.openSidebar = function openSidebar() {
          var _this2 = this;
          // this.allNode.sidebarBtn.getComponent(UIOpacity).opacity = 255;
          this.isMove = true;
          this.allNode.moveNode.active = true;
          this.allNode.mask.active = true;
          tween(this.allNode.moveNode).to(0.3, {
            position: v3(this.node.contentSize().width / 2 - this.allNode.moveNode.contentSize().width / 2, 0, 0)
          }).call(function () {
            _this2.isMove = false;
          }).bindNodeState(false).start();
          tween(this.allNode.sidebarBtn).to(0.3, {
            position: v3(this.node.contentSize().width / 2 - this.allNode.moveNode.contentSize().width - this.allNode.sidebarBtn.contentSize().width / 2, 0, 0)
          }).call(function () {}).bindNodeState(false).start();
          tween(this.allNode.mask).to(0.3, {
            position: v3(0, 0, 0)
          }).bindNodeState(false).start();
        }

        /**关闭侧边栏 */;
        _proto.closeSidebar = function closeSidebar() {
          var _this3 = this;
          // this.allNode.sidebarBtn.getComponent(UIOpacity).opacity = 110;
          this.isMove = true;
          tween(this.allNode.moveNode).to(0.15, {
            position: v3(this.node.contentSize().width / 2 + this.allNode.moveNode.contentSize().width / 2, 0, 0)
          }).call(function () {
            _this3.allNode.moveNode.active = false;
            _this3.isMove = false;
            _this3.allNode.block.active = false;
          }).start();
          tween(this.allNode.sidebarBtn).to(0.15, {
            position: v3(this.node.contentSize().width / 2 - this.allNode.sidebarBtn.contentSize().width / 2, 0, 0)
          }).call(function () {}).start();
          tween(this.allNode.mask).to(0.15, {
            position: v3(this.node.contentSize().width, 0, 0)
          }).call(function () {
            _this3.allNode.mask.active = false;
          }).start();
        }

        /** 刷新UI */;
        _proto.refreshUI = function refreshUI() {
          // this.allNode.activityContent.destroyAllChildren();
          var list = gameDataMgr.sidebarActivityList;
          this.scrollView.renderItemFn = function (itemNode, index) {
            var act = list[index];
            itemNode.getComponent(BannerView).setData(act, false);
            // itemNode.child(`img`).loadUrlImg(
            //     {
            //         url: act.imgUrl,
            //         target: this.node
            //     }
            // )
            // // itemNode.child(`img`).loadImg(`home/img/tempP/p${index + 1}`, BundleName.HALL)
            // itemNode.child(`textLeft`).setText(act.title);
            // itemNode.child(`btnDetail`).setText(act.btnName);
            // itemNode.child(`img`).child(`countdown`).active = false;
            // itemNode.getChildByPath('img/turntable_num').active = act.actionType == 2 && act.actionParams == `7` && gameDataMgr.wheelActivityInfo.remainTimes > 0;
          };

          this.scrollView.onItemClickFn = function (itemNode, index) {
            ActivityJumper.open(list[index]);
          };
          this.scrollView.getItemHeightFn = function (index) {
            return 243 * 0.58;
          };
          this.scrollView.refreshList(list);
          // for (let i = 0; i < actList.length; i++) {
          //     let data = actList[i];
          //     let item = instantiate(this.allNode.item);
          //         item.parent = this.allNode.activityContent;
          //         item.loadUrlImg(
          //             {
          //                 url: data.imgUrl,
          //                 target: this.node
          //             }
          //         )
          //         item.active = true;
          //         this.onClicked(item, () => {
          //             this.onSidebarBtnClick();
          //             this.onBtnClick(data);
          //         })
          // }
        };

        _proto.onBtnClick = function onBtnClick(act) {
          ActivityJumper.open(act);
        };
        _proto.update = function update(deltaTime) {};
        return SidebarPage;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mask", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveDownBtn", [_dec4], {
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

System.register("chunks:///_virtual/SwitchTabData.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bf3f0YfPAFJmr30BIWFGPQx", "SwitchTabData", undefined);
      var SwitchTabData = exports('SwitchTabData', function SwitchTabData(tabIndex, action) {
        this.tabIndex = void 0;
        this.action = void 0;
        this.tabIndex = tabIndex;
        this.action = action;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestChild.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './Decorators.ts', './MKViewBase.ts', './NGame.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, GloTitleBar, inject, MKViewBase, NGame;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "e6d53jAZbBE2KsGrW8hqJD0", "TestChild", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TestChild = exports('default', (_dec = ccclass('TestChild'), _dec2 = inject("GloTitleBar", GloTitleBar), _dec3 = inject("btnOpenChild", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(TestChild, _MKViewBase);
        function TestChild() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnOpenChild", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TestChild.prototype;
        _proto.open = function open() {
          this.gloTitleBar.initBar("TestChild", this.close);
          this.onClicked(this.btnOpenChild, function () {
            NGame.uiManage.openChild(TestChild);
          });
        };
        return TestChild;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnOpenChild", [_dec3], {
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

System.register("chunks:///_virtual/TopMoneyUi.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './PayUtils.ts', './Utils.ts', './FirstDeposit.ts', './SwitchTabData.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, EventName, HomeTabIndex, TabEvent, gloEvent, MKStaticViewBase, NGame, gameDataMgr, UIController, MoveDirection, PayUtils, Utils, safetyNum, FirstDeposit, SwitchTabData;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
    }, function (module) {
      EventName = module.EventName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
      MoveDirection = module.MoveDirection;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "08844My4sBPnogzm1CRDHF9", "TopMoneyUi", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TopMoneyUi = exports('TopMoneyUi', (_dec = ccclass('TopMoneyUi'), _dec(_class = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(TopMoneyUi, _MKStaticViewBase);
        function TopMoneyUi() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          _this.intY = null;
          _this.onCLose = void 0;
          return _this;
        }
        var _proto = TopMoneyUi.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          this.onMsg(EventName.ON_GET_USER_INFO, this.initTopBonusView);
        };
        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.ON_GET_USER_INFO, this.initTopBonusView);
        };
        _proto.initTopBonusView = function initTopBonusView() {
          var _gameDataMgr$userInfo,
            _gameDataMgr$userInfo2,
            _this2 = this;
          this.allNode.cashBalanceLb.setText(Utils.setCurrency((_gameDataMgr$userInfo = gameDataMgr.userInfo) == null || (_gameDataMgr$userInfo = _gameDataMgr$userInfo.pbfixBalance) == null ? void 0 : _gameDataMgr$userInfo.cToRateNum()));
          this.allNode.freeBonusLb.setText(Utils.setCurrency((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null || (_gameDataMgr$userInfo2 = _gameDataMgr$userInfo2.pbfixBonus) == null ? void 0 : _gameDataMgr$userInfo2.cToRateNum()));

          // this.onClicked(this.allNode.WithdrawlBtn2, () => {
          //     this.closeView()
          //     NGame.uiManage.open(FreeBonusWithdraw)
          // })
          this.allNode.addBtn.active = false;
          if (!PayUtils.isFirstPayActBuyed) {
            var _gameDataMgr$payConf;
            // this.scheduleOnce(() => {
            //     this.allNode.WithdrawlBtn1.child(`Label`).setText(`Deposit`.i18nStr())
            // })
            this.allNode.addBtn.active = true;
            this.allNode.firstLb.setText("+" + safetyNum(gameDataMgr == null || (_gameDataMgr$payConf = gameDataMgr.payConf) == null || (_gameDataMgr$payConf = _gameDataMgr$payConf.pbfixFirstPayConf) == null ? void 0 : _gameDataMgr$payConf.pbfixMaxGiftRate).cToFeeRateNum() + "%");
            this.onClicked(this.allNode.addBtn, function () {
              _this2.closeView();
              NGame.uiManage.open(FirstDeposit);
            });

            // this.onClicked(this.allNode.WithdrawlBtn1, () => {
            //     this.closeView()
            //     // EventManager.instance.emit(GlobalEvent.SWITCH_MAIN_SCENE_TAG, 0, 1);
            //     // gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {event: TabEvent.DEPOSIT_W}))
            //     gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {event: TabEvent.DEPOSIT_DEPOSIT}))
            // })
          }

          this.onClicked(this.allNode.WithdrawlBtn1, function () {
            _this2.closeView();
            // EventManager.instance.emit(GlobalEvent.SWITCH_MAIN_SCENE_TAG, 0, 1);
            // gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {event: TabEvent.DEPOSIT_W}))
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_DEPOSIT
            }));
          });
          this.onClicked(this.allNode.Help1, function () {
            NGame.dialog.show({
              text: "Money rule".i18nStr(),
              showAnim: true,
              confirmText: "Confirm".i18nStr(),
              onConfirm: function onConfirm() {}
            });
          });
          this.onClicked(this.allNode.Help2, function () {
            NGame.dialog.show({
              text: "Bonus rule".i18nStr(),
              showAnim: true,
              confirmText: "Confirm".i18nStr(),
              onConfirm: function onConfirm() {}
            });
          });
        };
        _proto.openView = function openView(onCLose) {
          this.onCLose = onCLose;
          if (this.allNode.TopBg.active) {
            this.closeView();
            return;
          }
          this.initTopBonusView();

          // 1. 先激活节点，否则 Widget 不会工作
          this.allNode.TopBg.active = true;
          this.allNode.mask.active = true;

          // 2. 【关键修复】强制让 TopBg 的 Widget 立即根据当前屏幕尺寸计算位置
          var widget = this.allNode.TopBg.getComponent(Widget);
          if (widget) {
            widget.updateAlignment(); // 这会立即更新 TopBg.y 到正确的顶部位置
          }

          // 3. 现在再调用动画，moveInDir 内部克隆到的 toPos 就是 100% 正确的终点坐标了
          UIController.moveInDir(this.allNode.TopBg, MoveDirection.Up, 0.3, function () {
            // widget && widget.updateAlignment();
          });
        };
        _proto.closeView = function closeView() {
          var _this3 = this;
          if (this.allNode.TopBg.active) {
            UIController.moveOutDir(this.allNode.TopBg, MoveDirection.Up, 0.3, function () {
              _this3.allNode.TopBg.active = false;
              _this3.allNode.mask.active = false;
              _this3.onCLose == null || _this3.onCLose();
            });
          }
        };
        return TopMoneyUi;
      }(MKStaticViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Turntable.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKViewBase.ts', './NetConstant.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './PayUtils.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Button, instantiate, v3, tween, color, Label, EventName, RedDotType, gloEvent, MKViewBase, CMD_SUCCESS, NGame, gameDataMgr, UIController, HttpPbFunc, pbfixPaymentSource, pbfixRewardType, pbfixRechargeFrequencyType, pbfixWheelRechargeStatus, GoogleAnalytics, GAEvent, PayUtils, Utils, safetyNum;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      instantiate = module.instantiate;
      v3 = module.v3;
      tween = module.tween;
      color = module.color;
      Label = module.Label;
    }, function (module) {
      EventName = module.EventName;
      RedDotType = module.RedDotType;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
      pbfixRewardType = module.pbfixRewardType;
      pbfixRechargeFrequencyType = module.pbfixRechargeFrequencyType;
      pbfixWheelRechargeStatus = module.pbfixWheelRechargeStatus;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "c44dcTBHbVEzp9NGSHJTj/P", "Turntable", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 转盘充值活动
       */
      var Turntable = exports('Turntable', (_dec = ccclass('Turntable'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(Turntable, _MKViewBase);
        function Turntable() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.data = null;
          _this.allNode = null;
          _this.isRotating = false;
          // 是否正在旋转
          _this.currentAngle = 0;
          // 当前角度
          _this.maxRotation = 5;
          // 最大旋转圈数
          _this.minRotation = 3;
          // 最小旋转圈数
          _this.rotationTime = 3;
          // 旋转时间（秒）
          _this.awardData = null;
          //奖品数据
          _this.wheelActivityInfo = null;
          return _this;
        }
        var _proto = Turntable.prototype;
        _proto.create = function create() {};
        _proto.open = function open() {
          var _this2 = this;
          // NGame.loading.show(null,0.7);
          GoogleAnalytics.track(GAEvent.DIALOG_TURNTABLE);
          this.allNode = UIController.getAllChildrenMap(this.node);
          // UIController.popUp(this.allNode.ScrollView)
          this.onClicked(this.allNode.closeBtn, function () {
            GoogleAnalytics.track(GAEvent.DIALOG_TURNTABLE_CLICK_CLOSE);
            _this2.closeView();
          });
          this.wheelActivityInfo = gameDataMgr.wheelActivityInfo;
          this.allNode.turntable.destroyAllChildren();

          // for (let i = 0; i < UserDate.getInstance().turntableActivityList.turntable_list.length; i++) {
          //     this.createTurntableItem(i, UserDate.getInstance().turntableActivityList.turntable_list[i]);
          // }

          for (var i = 0; i < this.wheelActivityInfo.pbfixRewardConfigs.length; i++) {
            this.createTurntableItem(i, this.wheelActivityInfo.pbfixRewardConfigs[i]);
          }
          this.refreshUI();
          this.allNode.startButton.on(Button.EventType.CLICK, this.startLottery, this);
          // Common.JNI_callFiveBase(`${FireBase_EVENT_ENUM.Recharge_Turntable}_click`);
        };

        _proto.closeView = function closeView() {
          var _this$initData;
          this.allNode.startButton.off(Button.EventType.CLICK, this.startLottery, this);
          // GlobalRoot.instance.UiManager.closePopup(GlobalManager.popups.Turntable777Prefab)
          this.closeAndDestroy();
          (_this$initData = this.initData) == null || _this$initData.onActClose == null || _this$initData.onActClose();
          gloEvent.emit(EventName.REMOVE_DIALOG_TOUCH_MASK);
        }

        /** 刷新UI */;
        _proto.refreshUI = function refreshUI() {
          var _this3 = this;
          var deposits = 0;
          var _loop = function _loop() {
            var _rechargeData$pbfixRe;
            var rechargeData = _this3.wheelActivityInfo.pbfixRechargeConfigs[i];
            var moneyPath = "";
            var payRatePath = "";
            var depositBtnPath = "";
            if (i <= 2) {
              moneyPath = "multiple/";
              payRatePath = "multiple/";
              depositBtnPath = "multiple/";
            }
            moneyPath += "item_" + i + "/depositBtn/money";
            payRatePath += "item_" + i + "/bgRate/pay_rate";
            depositBtnPath += "item_" + i + "/depositBtn";
            _this3.allNode.activity_list.getChildByPath(moneyPath).setText(Utils.setCurrency(rechargeData == null || (_rechargeData$pbfixRe = rechargeData.pbfixRechargeAmount) == null ? void 0 : _rechargeData$pbfixRe.cToRateNum()));
            _this3.allNode.activity_list.getChildByPath(payRatePath).setText(rechargeData.pbfixRechargeFrequencyType == pbfixRechargeFrequencyType.pbfixRECHARGE_AMOUNT_TYPE_CUMULATIVE ? "+" + safetyNum(rechargeData == null ? void 0 : rechargeData.pbfixBonusGiftRate).cToFeeRateNum() + "% " + "Bonus".i18nStr() : "+" + safetyNum(rechargeData == null ? void 0 : rechargeData.pbfixBonusGiftRate).cToFeeRateNum() + "% " + "Bonus".i18nStr() + "\n+SPIN x" + rechargeData.pbfixFreeSpinTimes);
            _this3.allNode.activity_list.getChildByPath(depositBtnPath + "/deposited").active = rechargeData.pbfixStatus == pbfixWheelRechargeStatus.pbfixWHEEL_RECHARGE_STATUS_PURCHASED;
            var moneyColor = color("#FFF000");
            var moneyStrokeColor = color("#007761");
            if (rechargeData.pbfixStatus == pbfixWheelRechargeStatus.pbfixWHEEL_RECHARGE_STATUS_PURCHASED) {
              moneyColor = color("#D7D6C0");
              moneyStrokeColor = color("#3A4C48");
            }
            _this3.allNode.activity_list.getChildByPath(moneyPath).getComponent(Label).color = moneyColor;
            _this3.allNode.activity_list.getChildByPath(moneyPath).getComponent(Label).outlineColor = moneyStrokeColor;
            var depositBtn = _this3.allNode.activity_list.getChildByPath(depositBtnPath);
            if (rechargeData.pbfixStatus == pbfixWheelRechargeStatus.pbfixWHEEL_RECHARGE_STATUS_CAN_PURCHASE) {
              _this3.onClicked(depositBtn, function () {
                GoogleAnalytics.track(GAEvent.DIALOG_TURNTABLE_CLICK_BUY);
                _this3.onDepositBtnClick(rechargeData);
              });
            } else {
              _this3.offClicked(depositBtn);
            }
            if (rechargeData.pbfixStatus == pbfixWheelRechargeStatus.pbfixWHEEL_RECHARGE_STATUS_PURCHASED && i < 3) {
              deposits++;
            }
          };
          for (var i = 0; i < this.wheelActivityInfo.pbfixRechargeConfigs.length; i++) {
            _loop();
          }
          if (this.wheelActivityInfo.pbfixRemainTimes > 0) {
            this.allNode.turntable_num.active = true;
            this.allNode.turntable_num.setText(this.wheelActivityInfo.pbfixRemainTimes);
            this.allNode.Ellipse.active = false;
            this.allNode.startButton.getComponent(Button).interactable = true;

            // 将红点加入到gameDataMgr.redDotSet中
            gameDataMgr.redDotSet.add(RedDotType.RED_DOT_WHEEL_ACTIVITY);
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: RedDotType.RED_DOT_WHEEL_ACTIVITY
            });
          } else {
            this.allNode.turntable_num.active = false;
            this.allNode.Ellipse.active = true;
            this.allNode.Ellipse.child('deposits').setText("Deposits".i18nStr() + "\n(" + deposits + "/3)");
            this.allNode.startButton.getComponent(Button).interactable = false;
            // 从gameDataMgr.redDotSet中移除红点
            gameDataMgr.redDotSet["delete"](RedDotType.RED_DOT_WHEEL_ACTIVITY);
            gloEvent.emit(EventName.RED_DOT_HIDE, {
              type: RedDotType.RED_DOT_WHEEL_ACTIVITY
            });
          }
        }

        /** 充值按钮点击事件 */;
        _proto.onDepositBtnClick = function onDepositBtnClick(rechargeData) {
          var _this4 = this;
          // GlobalManager.popups.PayTypePrefab.data = {
          //     /**name */
          //     name: "",
          //     /**price */
          //     price: activity_list.money,
          //     order_type: 3,
          //     card_id: activity_list.activity_id,
          //     /**callback */
          //     SuccessCallback: () => {
          //         ServerManager.getInstance().turntableActivityList((data) => {
          //             this.refreshUI();
          //         });
          //         Common.JNI_callFiveBase(`${FireBase_EVENT_ENUM.Recharge_Turntable}_complete`);
          //     },
          // }
          // GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.PayTypePrefab)

          GoogleAnalytics.track(GAEvent.RECHARGE_TURNTABLE);
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_WHEEL_ACTIVITY, rechargeData.pbfixRechargeAmount, rechargeData.pbfixId, function () {
            if (_this4.isValid) {
              var _rechargeData$pbfixRe2;
              NGame.dialog.showGetRewardDialog({
                rewardNum: rechargeData == null || (_rechargeData$pbfixRe2 = rechargeData.pbfixRechargeAmount) == null ? void 0 : _rechargeData$pbfixRe2.cToRateNum()
              });
              _this4.reloadData();
            }
          });
        };
        _proto.reloadData = function reloadData() {
          var _this5 = this;
          HttpPbFunc.pbfixWheelActivityInfoReq(this.node, function (result) {
            if (result.pbfixCode == CMD_SUCCESS) {
              _this5.wheelActivityInfo = gameDataMgr.wheelActivityInfo;
              _this5.refreshUI();
              HttpPbFunc.pbfixActivityListReq(_this5.node, null, true);
            }
          });
        }

        //创建转盘item
        ;

        _proto.createTurntableItem = function createTurntableItem(index, data) {
          var _data$pbfixRewardValu;
          var item = instantiate(this.allNode.turntableItem);
          item.active = true;
          item.setParent(this.allNode.turntable);
          item.setPosition(v3(0, 0, 0));
          // item.angle = -360 / 8 * index - 21.5;
          item.angle = -360 / 8 * index;
          item.child('icon_0').active = data.pbfixRewardType == pbfixRewardType.pbfixREWARD_TYPE_FREE_SPIN;
          item.child('icon_1').active = data.pbfixRewardType == pbfixRewardType.pbfixREWARD_TYPE_MONEY;
          // item.getChildByPath('Layout/Vector').active = data.rewardType == RewardType.REWARD_TYPE_MONEY;
          // item.getChildByPath('Layout/Vector/Label').setText(`${GameCfg.currency}`);
          item.child('num').setText(data.pbfixRewardType == pbfixRewardType.pbfixREWARD_TYPE_FREE_SPIN ? "x" + data.pbfixRewardValue : "" + Utils.setCurrency(data == null || (_data$pbfixRewardValu = data.pbfixRewardValue) == null ? void 0 : _data$pbfixRewardValu.cToRateNum()));
        }

        /**
         * 开始抽奖
         */;
        _proto.startLottery = function startLottery() {
          var _this6 = this;
          GoogleAnalytics.track(GAEvent.DIALOG_TURNTABLE_CLICK_SPIN);
          if (this.isRotating) {
            return; // 如果正在旋转，则不响应
          }

          // 禁用按钮
          this.isRotating = true;

          // if (true) {
          //     const idx = Utils.random(0, this.wheelActivityInfo.rewardConfigs.length - 1);
          //     this.awardData = this.wheelActivityInfo.rewardConfigs[idx];
          //     const targetAngle = this.calculateTargetAngle(idx);
          //     // 执行旋转动画
          //     this.rotateWheel(targetAngle);
          //     return;
          // }
          HttpPbFunc.pbfixSpinWheelActivityReq(this.node, function (result) {
            if (result.pbfixCode == CMD_SUCCESS) {
              _this6.allNode.closeBtn.active = false;
              _this6.scheduleOnce(function () {
                _this6.allNode.closeBtn.active = true;
              }, 3.5);
              var data = result;
              var prizeIndex = _this6.findPrizeIndex(data.pbfixRewardId);
              // 计算目标角度
              var targetAngle = _this6.calculateTargetAngle(prizeIndex);
              // 执行旋转动画
              _this6.rotateWheel(targetAngle);
              // EventManager.instance.emit(GlobalEvent.REFRESH_TURNTABLE_ACTIVITY)
              // ServerManager.getInstance().turntableActivityList((data) => { });
            } else {
              _this6.isRotating = false;
            }
          });
        }

        /**查找奖品索引 */;
        _proto.findPrizeIndex = function findPrizeIndex(turntable_id) {
          for (var i = 0; i < this.wheelActivityInfo.pbfixRewardConfigs.length; i++) {
            if (this.wheelActivityInfo.pbfixRewardConfigs[i].pbfixId == turntable_id) {
              this.awardData = this.wheelActivityInfo.pbfixRewardConfigs[i];
              return i;
            }
          }
          return null;
        }

        /**
         * 计算目标角度
         * @param prizeIndex 奖品索引
         * @returns 目标角度
         */;
        _proto.calculateTargetAngle = function calculateTargetAngle(prizeIndex) {
          // 每个奖品占据的角度
          var anglePerPrize = 360 / 8;

          //随机偏移角度
          var randomOffset = Math.random() > 0.5 ? -Math.random() * (anglePerPrize / 3) : Math.random() * anglePerPrize / 3;

          // 奖品对应的角度（中心点角度）
          // const prizeCenterAngle = prizeIndex * anglePerPrize + 21.5;
          var prizeCenterAngle = prizeIndex * anglePerPrize;

          // 随机旋转圈数 
          var rotationCount = Math.floor(this.minRotation + Math.random() * (this.maxRotation - this.minRotation));

          // 总旋转角度 = 完整圈数（负值）+ 奖品角度 - 当前角度
          var totalAngle = -rotationCount * 360 + prizeCenterAngle - 360 - this.currentAngle % 360 + randomOffset;
          return this.currentAngle + totalAngle;
        }
        /**
         * 旋转转盘
         * @param targetAngle 目标角度
         */;
        _proto.rotateWheel = function rotateWheel(targetAngle) {
          var _this7 = this;
          // 使用缓动系统实现旋转动画
          tween(this.allNode.turntable).to(this.rotationTime, {
            eulerAngles: v3(0, 0, targetAngle)
          }, {
            easing: "cubicOut",
            // 缓动函数，先快后慢
            onUpdate: function onUpdate(target, ratio) {
              // 更新当前角度
              _this7.currentAngle = target.eulerAngles.z;
            }
          }).call(function () {
            // 旋转完成回调
            _this7.allNode.closeBtn.active = true;
            _this7.onRotationComplete();
          }).start();
        }

        /**
         * 旋转完成回调
         */;
        _proto.onRotationComplete = function onRotationComplete() {
          this.isRotating = false;
          if (this.awardData) {
            if (this.awardData.pbfixRewardType == pbfixRewardType.pbfixREWARD_TYPE_MONEY) {
              var _this$awardData;
              NGame.dialog.showGetRewardDialog({
                rewardNum: safetyNum((_this$awardData = this.awardData) == null ? void 0 : _this$awardData.pbfixRewardValue).cToRateNum()
              });
            } else {
              NGame.tips.toast("Whell Get RewardSuccess, Free Spins X" + this.awardData.pbfixRewardValue);
            }
          }
          this.reloadData();
          // if (this.awardData.rewardType == 1) {
          //     NGame.dialog.showGetRewardDialog({ rewardNum: this.awardData.rewardValue.cToRateNum() })
          // } else {

          // }

          this.refreshUI();
          HttpPbFunc.pbfixUserInfoReq(null, false, null);
        };
        return Turntable;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserInfoPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './Constant.ts', './Decorators.ts', './UIHelper.ts', './MKExport.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './CommonUtils.ts', './PlatformUtils.ts', './Utils.ts', './BetStatistcisPage.ts', './BindPhoneDialog.ts', './EmailPage.ts', './FundDetailPage.ts', './HelpPage.ts', './SwitchTabData.ts', './FreeBonusWithdraw.ts', './VipLevelPage.ts', './HttpPbFunc.ts', './AvatarSelDialog.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Sprite, SpriteFrame, Node, EditBox, ScrollView, Label, UITransform, GloTitleBar, EventName, BundleName, HomeTabIndex, TabEvent, StorageKey, inject, UIHelper, UIPath, gloEvent, MKViewBase, NGame, gameDataMgr, CommonUtils, PlatformUtils, safetyNum, BetStatistcisPage, BindPhoneDialog, EmailPage, FundDetailPage, HelpPage, SwitchTabData, FreeBonusWithdraw, VipLevelPage, HttpPbFunc, isResponseValid, AvatarSelDialog, GoogleAnalytics, GAEvent;
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
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      EditBox = module.EditBox;
      ScrollView = module.ScrollView;
      Label = module.Label;
      UITransform = module.UITransform;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      EventName = module.EventName;
      BundleName = module.BundleName;
      HomeTabIndex = module.HomeTabIndex;
      TabEvent = module.TabEvent;
      StorageKey = module.StorageKey;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      CommonUtils = module.CommonUtils;
    }, function (module) {
      PlatformUtils = module.PlatformUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
    }, function (module) {
      BetStatistcisPage = module.BetStatistcisPage;
    }, function (module) {
      BindPhoneDialog = module.BindPhoneDialog;
    }, function (module) {
      EmailPage = module.EmailPage;
    }, function (module) {
      FundDetailPage = module.FundDetailPage;
    }, function (module) {
      HelpPage = module.HelpPage;
    }, function (module) {
      SwitchTabData = module.SwitchTabData;
    }, function (module) {
      FreeBonusWithdraw = module.FreeBonusWithdraw;
    }, function (module) {
      VipLevelPage = module.VipLevelPage;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      AvatarSelDialog = module.AvatarSelDialog;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "320e9kXLXdO5bY0Bqsdwu9G", "UserInfoPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MaxNickLen = 20;
      var UserInfoPage = exports('UserInfoPage', (_dec = ccclass('UserInfoPage'), _dec2 = inject("GloTitleBar", GloTitleBar), _dec3 = inject("ScrollView/view/content/img_userinfo/editBox_nick/", Node), _dec4 = inject("ScrollView/view/content/img_userinfo/node_nick/btn_edit/", Node), _dec5 = inject("ScrollView/view/content/img_userinfo/node_nick/btn_sex/", Node), _dec6 = inject("ScrollView/view/content/img_userinfo/node_avatar/", Node), _dec7 = property(Sprite), _dec8 = inject("ScrollView/view/content/node_info_list/node_bind_account/", Node), _dec9 = inject("ScrollView/view/content/node_info_list/node_change_pwd/", Node), _dec10 = property({
        type: [SpriteFrame]
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(UserInfoPage, _MKViewBase);
        function UserInfoPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nickEditBoxNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nickEditBtn", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "setSexBtn", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "avatarEditBtn", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sexSprite", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bindAccountNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "changePwdNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sexSpriteFrames", _descriptor9, _assertThisInitialized(_this));
          // 0：男，1：女
          _this.allNode = null;
          _this.nickEditBox = null;
          _this.originNick = "";
          return _this;
        }
        var _proto = UserInfoPage.prototype;
        // 原始昵称，修改失败后需要还原
        _proto.open = function open() {
          // this.gloTitleBar.initBar("Me".i18nStr(), this.closeAndDestroy.bind(this))
          this.nickEditBox = this.nickEditBoxNode.getComponent(EditBox);
          this.gloTitleBar.initBar("Me".i18nStr(), this.close.bind(this));
          this.allNode = this.getAllChildrenMap(this.node);
          this.node.getChildByName("ScrollView").getComponent(ScrollView).scrollToTop(0.1);
          this.updateUserInfo();
          this.onMsg(EventName.ON_GET_USER_INFO, this.updateUserInfo);
          this.onMsg(EventName.REQUEST_CLOSE_PAGE_USER_INFO, this.closeAndDestroy);
          this.onMsg(EventName.ON_BIND_ACCOUNT, this.onBindAccount);
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
          this.initClickListener();
          this.preloadPage();
        };
        _proto.preloadPage = /*#__PURE__*/function () {
          var _preloadPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var isBindAccount, preloadTasks;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  isBindAccount = gameDataMgr.isBindAccount;
                  preloadTasks = [UIHelper.regisUI(AvatarSelDialog, UIPath.AvatarSelDialog)];
                  if (isBindAccount) {
                    preloadTasks.push(UIHelper.regisResetPwdDialog());
                  } else {
                    preloadTasks.push(UIHelper.regisRegDialog());
                  }
                  _context.next = 5;
                  return Promise.all(preloadTasks);
                case 5:
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
        _proto.updateUserInfo = function updateUserInfo() {
          var _gameDataMgr$userInfo, _gameDataMgr$userInfo2, _gameDataMgr$userInfo3, _gameDataMgr$userInfo4, _gameDataMgr$userInfo5, _gameDataMgr$userInfo6, _gameDataMgr$userInfo7, _gameDataMgr$userInfo8, _gameDataMgr$userInfo9;
          // log("initUserInfo", GlobalManager.updateInfo);
          // this.allNode.version.getChildByName("green").active = !GlobalManager.serverUrl.includes("test");
          // this.allNode.version.getChildByName("red").active = GlobalManager.serverUrl.includes("test");
          // this.allNode.version.getChildByName("versionLb").getComponent(Label).string = "version：" + Common.JNI_getAppVersionName() + "_" + Common.JNI_getAppVersionCode();

          // this.allNode.label_nick.setText(Utils.getNick(gameDataMgr.userInfo.pbfixNick ?? "", 20));
          this.originNick = (_gameDataMgr$userInfo = gameDataMgr.userInfo.pbfixNick) != null ? _gameDataMgr$userInfo : "";
          this.setSex((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixSex);
          this.setNick();
          this.nickEditBtn.active = true;
          this.setSexBtn.active = true;
          this.allNode.label_vip.setText("LV." + gameDataMgr.userInfo.pbfixVip);
          this.allNode.node_total_bets.child("label_value").setText(safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo3 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo3.pbfixTotalBetBalance).cToRateNum());
          this.allNode.node_total_wagers.child("label_value").setText(safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo4 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo4.pbfixRemainValueBalance).cToRateNum());
          // this.allNode.node_total_wagers.child("label_title").setText("Total Wagers".i18nStr() + "(" + GameCfg.currency_abbreviation + ")");

          var avatarIndex = (_gameDataMgr$userInfo5 = (_gameDataMgr$userInfo6 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo6.pbfixAvatar) != null ? _gameDataMgr$userInfo5 : "12";
          this.allNode.img_head.loadImg("UserInfo/img/avatar/avatar_" + avatarIndex, BundleName.HALL, this.node);
          this.allNode.node_balance.child("layout_value").child("label_value").setText("$ " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo7 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo7.pbfixBalance).cToRateNum());
          this.allNode.node_bonus.child("layout_value").child("label_value").setText(" " + safetyNum(gameDataMgr == null || (_gameDataMgr$userInfo8 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo8.pbfixBonus).cToRateNum());
          this.allNode.label_id.setText("ID:" + gameDataMgr.userInfo.pbfixUid);
          if (gameDataMgr.isBindedPhone) {
            this.allNode.label_phone.setText(gameDataMgr.userInfo.pbfixPhone);
          }
          this.initItemNodeVisible();
          this.allNode.node_bind_invite_code.child("label_value").setText(gameDataMgr.userInfo.pbfixInviteCode);
          this.allNode.icon_vip.loadImg("UserInfo/img/vip_lv" + CommonUtils.getVipIconIndex(((_gameDataMgr$userInfo9 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo9.pbfixVip) || 0), BundleName.HALL, this.node);
        }

        // 绑定账号和密码完成
        ;

        _proto.onBindAccount = function onBindAccount() {
          this.initItemNodeVisible();
          this.preloadPage();
        };
        _proto.initItemNodeVisible = function initItemNodeVisible() {
          if (gameDataMgr.isBindedPhone) {
            this.allNode.btn_bind_phone.active = false;
          } else {
            this.allNode.btn_bind_phone.active = true;
          }

          // 绑定账号和修改密码
          var isBindAccount = gameDataMgr.isBindAccount;
          this.bindAccountNode.child("btn_bind_account").active = isBindAccount;
          this.bindAccountNode.active = true;
          if (isBindAccount) {
            this.bindAccountNode.child("btn_bind_account").active = false;
            this.bindAccountNode.child("label_account").getComponent(Label).string = gameDataMgr.userInfo.pbfixAccount || "";
            this.changePwdNode.active = true;
          } else {
            this.changePwdNode.active = false;
            this.bindAccountNode.child("btn_bind_account").active = true;
          }
        };
        _proto.initClickListener = function initClickListener() {
          var _this2 = this,
            _gameDataMgr$userInfo11;
          this.onClicked(this.nickEditBtn, function () {
            _this2.onClickEditNickBtn();
          }, false, 1.0, false);
          this.onClicked(this.setSexBtn, function () {
            _this2.onClickSetSexBtn();
          }, false, 1.0, false);
          this.onClicked(this.avatarEditBtn, function () {
            _this2.onClickEditAvatarBtn();
          }, false, 1.0, false);
          this.onClicked(this.allNode.node_bet_details, function () {
            GoogleAnalytics.track(GAEvent.CLICK_BET_DETAIL);
            UIHelper.openUI(BetStatistcisPage, UIPath.BetStatistcisPage);
          });
          this.onClicked(this.allNode.node_balance.child("btn_wd"), function () {
            GoogleAnalytics.track(GAEvent.CASH_WITHDRAW);
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_W
            }));
            _this2.closeAndDestroy();
          });
          this.onClicked(this.allNode.node_bonus.child("btn_wd"), function () {
            GoogleAnalytics.track(GAEvent.BONUS_WITHDRAW);
            NGame.uiManage.open(FreeBonusWithdraw);
          });
          this.onClicked(this.allNode.node_click_free_bonus, function () {
            GoogleAnalytics.track(GAEvent.BONUS_WITHDRAW);
            NGame.uiManage.open(FreeBonusWithdraw);
          });
          this.onClicked(this.allNode.icon_vip, function () {
            GoogleAnalytics.track(GAEvent.CLICK_VIP_LEVEL);
            UIHelper.openUI(VipLevelPage, UIPath.VipLevelPage);
          }, false, 0.1, false);
          this.onClicked(this.allNode.btn_recharge, function () {
            GoogleAnalytics.track(GAEvent.CLICK_DEPOSIT_USERINFO_PAGE);
            gloEvent.emit(EventName.SWITCH_TAB, new SwitchTabData(HomeTabIndex.Deposit, {
              event: TabEvent.DEPOSIT_DEPOSIT
            }));
            _this2.closeAndDestroy();
          });

          /** 复制ID */
          this.onClicked(this.allNode.img_userinfo.child("btn_copy_id"), function () {
            var _gameDataMgr$userInfo10;
            var id = ((_gameDataMgr$userInfo10 = gameDataMgr.userInfo.pbfixUid) != null ? _gameDataMgr$userInfo10 : "").toString();
            PlatformUtils.copyToClipboard(id);
            NGame.tips.toast("copy success".i18nStr());
          });

          // bindAccountNode
          this.onClicked(this.bindAccountNode.child("btn_bind_account"), function () {
            GoogleAnalytics.track(GAEvent.CLICK_BIND_ACCOUNT);
            UIHelper.openRegDialog({
              isBindAccountDialog: true
            });
          });
          this.onClicked(this.changePwdNode.child("btn_change_pwd"), function () {
            GoogleAnalytics.track(GAEvent.CLICK_CHANGE_PWD);
            gameDataMgr.isChangePwdDialog = true;
            UIHelper.openResetPwdDialog();
          });

          /** 复制邀请码 */
          this.onClicked(this.allNode.node_bind_invite_code.child("btn_copy_invite_code"), function () {
            PlatformUtils.copyToClipboard(gameDataMgr.userInfo.pbfixInviteCode);
            NGame.tips.toast("copy success".i18nStr());
          });
          var bonus = "Free Bonus Withdrawl:".i18nStr(["$" + safetyNum((_gameDataMgr$userInfo11 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo11.pbfixBonus).cToRateNum()]);
          this.allNode.node_free_bonus.child("label_title").setText(bonus);

          // 资金明细
          this.onClicked(this.allNode.node_money_details, function () {
            GoogleAnalytics.track(GAEvent.CLICK_MONEY_DETAIL);
            UIHelper.openUI(FundDetailPage, UIPath.FundDetailPage);
          });
          this.onClicked(this.allNode.node_email, function () {
            GoogleAnalytics.track(GAEvent.CLICK_EMAIL);
            NGame.uiManage.open(EmailPage);
          });

          // 帮助页面
          this.onClicked(this.allNode.node_help, function () {
            GoogleAnalytics.track(GAEvent.DIALOG_HELP);
            UIHelper.openUI(HelpPage, UIPath.HelpPage);
          });

          // 隐私政策
          // this.onClicked(this.allNode.label_policy, () => {
          // EventManager.instance.emit(GlobalEvent.SWITCH_OTHER_SCENE_TAG, otherPageTag.HelpCenter);
          // }, false, 0.1, false)

          // 绑定手机号
          this.onClicked(this.allNode.btn_bind_phone, function () {
            GoogleAnalytics.track(GAEvent.CLICK_BIND_PHONE);
            UIHelper.openUI(BindPhoneDialog, UIPath.BindPhoneDialog);
          });
        };
        _proto.onDestroy = function onDestroy() {
          this.offMsg(EventName.ON_GET_USER_INFO, this.updateUserInfo);
          this.offMsg(EventName.REQUEST_CLOSE_PAGE_USER_INFO, this.closeAndDestroy);
        }

        // 修改昵称
        ;

        _proto.onClickEditNickBtn = function onClickEditNickBtn() {
          GoogleAnalytics.track(GAEvent.CLICK_EDIT_NICK);
          this.nickEditBtn.active = false;
          this.setSexBtn.active = false;
          this.allNode.label_nick.active = false;
          this.nickEditBoxNode.active = true;
          this.nickEditBox.focus(); // 让输入框获取焦点
        }

        // 修改性别
        ;

        _proto.onClickSetSexBtn = function onClickSetSexBtn() {
          var _gameDataMgr$userInfo12;
          GoogleAnalytics.track(GAEvent.CLICK_EDIT_SEX);
          var setSex = Number((_gameDataMgr$userInfo12 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo12.pbfixSex) || 1;
          if (setSex === 1) {
            setSex = 2;
          } else {
            setSex = 1;
          }
          this.setSex(setSex);
          this.reqSetSex(setSex);
        }

        // 修改头像
        ;

        _proto.onClickEditAvatarBtn = function onClickEditAvatarBtn() {
          GoogleAnalytics.track(GAEvent.CLICK_EDIT_AVATAR);
          UIHelper.openUI(AvatarSelDialog, UIPath.AvatarSelDialog);
        };
        _proto.onNickEditFinished = function onNickEditFinished() {
          this.nickEditBoxNode.active = false;
          this.nickEditBtn.active = true;
          this.setSexBtn.active = true;
          this.allNode.label_nick.active = true;
          var nick = this.nickEditBox.string;
          this.nickEditBox.string = "";
          if (nick && nick.trim().length > 0) {
            this.setNick(nick);
            if (nick !== this.originNick) {
              this.reqEditNick(nick);
            }
          }
        };
        _proto.setNick = function setNick(nick) {
          var _gameDataMgr$userInfo13,
            _this3 = this;
          if (nick === void 0) {
            nick = null;
          }
          var displayName = nick || ((_gameDataMgr$userInfo13 = gameDataMgr.userInfo.pbfixNick) != null ? _gameDataMgr$userInfo13 : "");
          if (displayName.length > MaxNickLen) {
            displayName = displayName.slice(0, MaxNickLen - 1) + '…';
          }
          this.allNode.label_nick.setText(displayName);
          this.scheduleOnce(function () {
            var labelUI = _this3.allNode.label_nick.getComponent(UITransform);
            var labelWidth = labelUI.width;

            // 获取文本锚点（默认是(0.5,0.5)，所以要计算左起点）
            var labelAnchorX = _this3.allNode.label_nick.anchorX;
            var space = 40;
            var btnX = _this3.allNode.label_nick.position.x + labelWidth * (1 - labelAnchorX) + space;
            _this3.nickEditBtn.setPosition(btnX, _this3.nickEditBtn.position.y);
            _this3.setSexBtn.setPosition(btnX + 74, _this3.nickEditBtn.position.y);
          });
        };
        _proto.setSex = function setSex(sex) {
          if (sex === void 0) {
            sex = 0;
          }
          sex = sex || 1;
          this.sexSprite.spriteFrame = this.sexSpriteFrames[sex - 1] || this.sexSpriteFrames[0];
        };
        _proto.reqEditNick = function reqEditNick(nick) {
          var _this4 = this;
          if (!nick || nick.trim().length === 0) {
            return;
          }

          //  repeated int32 types = 2; // 更新类型（支持一次改多个）：1 昵称 | 2 头像 | 3 性别
          var params = {
            pbfixTypes: [1],
            pbfixNick: nick
          };
          HttpPbFunc.pbfixUpdateUserInfoReq(this.node, params, function (result) {
            // 成功
            // console.log("pbfixUpdateUserInfoReq:",result);
            if (isResponseValid(result, "Profile update error".i18nStr())) {
              gameDataMgr.userInfo.pbfixNick = nick;
              NGame.tips.toast("Profile update success".i18nStr());
            }
            _this4.setNick();
          });
        };
        _proto.reqSetSex = function reqSetSex(sex) {
          if (sex === void 0) {
            sex = 1;
          }
          //  repeated int32 types = 2; // 更新类型（支持一次改多个）：1 昵称 | 2 头像 | 3 性别
          var params = {
            pbfixTypes: [3],
            pbfixSex: sex
          };
          gameDataMgr.userInfo.pbfixSex = sex;
          HttpPbFunc.pbfixUpdateUserInfoReq(this.node, params, function (result) {
            // 成功
            if (isResponseValid(result, "Profile update error".i18nStr())) {
              NGame.tips.toast("Profile update success".i18nStr());
            }
          });
          this.autoUpdateAvatar();
        };
        _proto.autoUpdateAvatar = function autoUpdateAvatar() {
          var _gameDataMgr$userInfo14, _gameDataMgr$userInfo15;
          var sex = Number((_gameDataMgr$userInfo14 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo14.pbfixSex) || 1;
          var isAvatarModified = NGame.storage.get(StorageKey.IS_AVATAR_MODIFIED);
          if (isAvatarModified) {
            // 玩家自己修改过头像，则不强制改头像
            return;
          }

          // 获取当前头像下标
          var currentAvatarIndex = Number((_gameDataMgr$userInfo15 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo15.pbfixAvatar) || 12;

          // 判断当前头像和性别是否匹配
          if (currentAvatarIndex % 2 === 0) {
            if (sex === 2) {
              return;
            }
          } else {
            if (sex === 1) {
              return;
            }
          }

          // 随机找一个同性别的头像
          // 男士头像下标：1,3,5,7,9,11
          // 女士头像下标：2,4,6,8,10,12
          var avatarIndex = sex === 1 ? Math.floor(Math.random() * 6) * 2 + 1 : Math.floor(Math.random() * 6) * 2 + 2;
          gameDataMgr.userInfo.pbfixAvatar = avatarIndex.toString();
          // NGame.storage.set(StorageKey.IS_AVATAR_MODIFIED, true)

          gameDataMgr.userInfo.pbfixAvatar = avatarIndex.toString();
          gloEvent.emit(EventName.ON_GET_USER_INFO); // 刷新个人信息框和大厅的头像
          gloEvent.emit(EventName.ON_AVATAR_UPDATE); // 刷新当前弹框的头像选择tag
          // 发送请求
          this.reqEditAvatar(avatarIndex);
        };
        _proto.reqEditAvatar = function reqEditAvatar(reqEditAvatarIndex) {
          // 限制请求频率
          // repeated int32 types = 2; // 更新类型（支持一次改多个）：1 昵称 | 2 头像 | 3 性别
          var params = {
            pbfixTypes: [2],
            pbfixAvatar: reqEditAvatarIndex.toString()
          };
          HttpPbFunc.pbfixUpdateUserInfoReq(this.node, params, function (result) {
            if (isResponseValid(result, "Profile update error".i18nStr())) ;
          });
        }

        /**
         * 判断节点是否在当前父节点的顶层
         */;
        _proto.isTopInParent = function isTopInParent(node) {
          if (!node || !node.parent) return false;
          var children = node.parent.children;
          // 获取当前父节点中最大的 siblingIndex
          return node.getSiblingIndex() === children.length - 1;
        };
        return UserInfoPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nickEditBoxNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nickEditBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "setSexBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "avatarEditBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sexSprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bindAccountNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "changePwdNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "sexSpriteFrames", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VipActivity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKViewBase.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './CommonUtils.ts', './Utils.ts', './RechargeRolling.ts', './VipActivityShop.ts', './VipLvItem.ts', './VipReceiveManage.ts', './MKExport.ts', './NGame.ts', './GoogleAnatytics.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, ProgressBar, RichText, tween, UIOpacity, instantiate, Vec3, Label, EventName, BundleName, RedDotType, MKViewBase, gameDataMgr, UIController, HttpPbFunc, pbfixVipActivityStatus, CommonUtils, safetyNum, Utils, RechargeRolling, VipActivityShop, VipLvItem, VipReceiveManage, gloEvent, NGame, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      ProgressBar = module.ProgressBar;
      RichText = module.RichText;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Label = module.Label;
    }, function (module) {
      EventName = module.EventName;
      BundleName = module.BundleName;
      RedDotType = module.RedDotType;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixVipActivityStatus = module.pbfixVipActivityStatus;
    }, function (module) {
      CommonUtils = module.CommonUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      RechargeRolling = module.RechargeRolling;
    }, function (module) {
      VipActivityShop = module.VipActivityShop;
    }, function (module) {
      VipLvItem = module.VipLvItem;
    }, function (module) {
      VipReceiveManage = module.VipReceiveManage;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;
      cclegacy._RF.push({}, "220ceoespxBq43Ad5gizCRC", "VipActivity", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * VIP充值活动
       */
      var VipActivity = exports('VipActivity', (_dec = ccclass('VipActivity'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Prefab
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: Node
      }), _dec11 = property({
        type: Prefab
      }), _dec12 = property({
        type: Node
      }), _dec13 = property({
        type: Node
      }), _dec14 = property({
        type: Node
      }), _dec15 = property({
        type: ProgressBar
      }), _dec16 = property({
        type: RichText
      }), _dec17 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(VipActivity, _MKViewBase);
        function VipActivity() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "leftArrBtn", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rightArrBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buyNode", _descriptor3, _assertThisInitialized(_this));
          // 可购买状态节点
          _initializerDefineProperty(_this, "receiveNode", _descriptor4, _assertThisInitialized(_this));
          // 领取权益状态节点  
          _initializerDefineProperty(_this, "activityLevelLvContentNode", _descriptor5, _assertThisInitialized(_this));
          // 活动等级列表节点
          _initializerDefineProperty(_this, "activityLevelPrefab", _descriptor6, _assertThisInitialized(_this));
          // 活动等级item 预制件
          _initializerDefineProperty(_this, "closeBtnNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "helpBtnNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buyPlayerMarqueeContentNode", _descriptor9, _assertThisInitialized(_this));
          // 购买玩家列表跑马灯列表节点  
          _initializerDefineProperty(_this, "buyPlayerPrefab", _descriptor10, _assertThisInitialized(_this));
          // 购买玩家信息预制体
          // vip信息
          _initializerDefineProperty(_this, "vipLevelLabelNode", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipLevelIcon", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipUpgradeRechargeLabelNode", _descriptor13, _assertThisInitialized(_this));
          // 升级下一级VIP目标充值金额
          _initializerDefineProperty(_this, "vipLevelProgressBar", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipLevelTipsRichText", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "baseNode", _descriptor16, _assertThisInitialized(_this));
          _this.data = [];
          _this.vipData = [];
          _this.targetIndex = 184;
          //目标距离
          _this.vipPointChildren = [];
          _this.curSelLevelIndex = 0;
          // 当前选定的活动等级 
          _this.isLoadData = false;
          _this.allMoney = [];
          _this.startPos = 92;
          _this.userLv = -1;
          // 当前用户VIP等级？没用到
          _this.levelArray = [];
          _this.allNode = null;
          _this.depositedList = [];
          return _this;
        }
        var _proto = VipActivity.prototype;
        _proto.open = function open() {
          GoogleAnalytics.track(GAEvent.DIALOG_VIP_ACTIVITY);
          this.allNode = UIController.getAllChildrenMap(this.node);
          this.showView();
          // Common.JNI_callFiveBase(`${FireBase_EVENT_ENUM.VIP_Recharge_Package}_click`);
        };

        _proto.showView = function showView() {
          var _this2 = this;
          this.getBuyVipActivityList(this.userLv);
          this.onClicked(this.closeBtnNode, function () {
            _this2.unschedule(_this2.updateUserData);
            _this2.closeAndDestroy();
          });
          this.onClicked(this.helpBtnNode, function () {
            NGame.dialog.show({
              text: "VIP rule".i18nStr(),
              showAnim: true,
              confirmText: "Confirm".i18nStr(),
              onConfirm: function onConfirm() {}
            });
          });
          this.initMyVipData();
        }

        /**获取vip活动列表 */;
        _proto.getBuyVipActivityList = function getBuyVipActivityList(userLv) {
          var _this3 = this;
          NGame.loading.show(null, 2.0);
          HttpPbFunc.pbfixVipActivityListReq(this.node, function (result) {
            NGame.loading.hide();
            if (result) {
              tween(_this3.baseNode.getComponent(UIOpacity)).to(0.5, {
                opacity: 255
              }).start();
              _this3.data = result.pbfixItems;
              _this3.depositedList = result.pbfixDepositedList;
              _this3.initReddot();
              _this3.data.sort(function (item1, item2) {
                return item1.pbfixActivityLevel - item2.pbfixActivityLevel;
              });
              _this3.data.sort(function (item1, item2) {
                return item1.pbfixRechargeAmount - item2.pbfixRechargeAmount;
              });
              _this3.addDataLv(_this3.data, userLv);
              if (!_this3.isLoadData) {
                _this3.isLoadData = true;
                _this3.showDepositedUsersView();
              }
            }
          });
        };
        _proto.addDataLv = function addDataLv(dataList, userLv) {
          var _this4 = this;
          this.activityLevelLvContentNode.removeAllChildren();

          // let level: number[] = []
          // let currentBuyLv = 1;// 目前等级

          var buyLv = 1; // 当前能购买的等级
          for (var i = 0; i < dataList.length; i++) {
            var _dataList$i;
            var vipLv = dataList[i].pbfixActivityLevel;
            if (!this.levelArray.includes(vipLv)) {
              this.levelArray.push(vipLv);
            }
            if (dataList[i].pbfixStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_CAN_PURCHASE) {
              this.curSelLevelIndex = vipLv;
              buyLv = vipLv;
            }
            var money = safetyNum((_dataList$i = dataList[i]) == null ? void 0 : _dataList$i.pbfixRechargeAmount).cToRateNum();
            if (!this.allMoney.includes(money)) {
              this.allMoney.push(money);
            }
          }

          // 获取当前可领取权益的下标
          var vipRewardIndex = this.getVipRewardIndex();
          if (vipRewardIndex != -1) {
            var _vipLv = dataList[vipRewardIndex].pbfixActivityLevel;
            this.curSelLevelIndex = _vipLv;
            buyLv = _vipLv;
          }

          // if (userLv != -1) {
          //     this.curSelLevelIndex = userLv
          // }

          // 备注：默认展示1级的商品信息，如果玩家不是vip进入活动页面
          if (this.curSelLevelIndex == 0) {
            this.curSelLevelIndex = 1;
          }

          // 展示购买等级
          for (var _i = 0; _i < this.levelArray.length; _i++) {
            var vipItem = instantiate(this.activityLevelPrefab);
            vipItem.setPosition((this.levelArray[_i] - this.curSelLevelIndex + 1) * this.targetIndex + this.startPos, 0);
            vipItem.getComponent(VipLvItem).initD(this.levelArray[_i], buyLv, function (levelIndex) {
              _this4.curSelLevelIndex = levelIndex;
              _this4.updateLvPoint();
              _this4.initBtnData();
              _this4.updateLevelData(dataList);
            });
            this.activityLevelLvContentNode.addChild(vipItem);
          }
          this.vipPointChildren = this.activityLevelLvContentNode.children;
          this.initBtnData();
          this.updateLevelData(dataList);
          this.onClicked(this.rightArrBtn, function () {
            if (_this4.curSelLevelIndex < _this4.levelArray[_this4.levelArray.length - 1]) {
              _this4.curSelLevelIndex++;
              _this4.initBtnData();
              _this4.updateLevelData(dataList);
              _this4.updateLvPoint();
              gloEvent.emit(EventName.ON_VIP_ACTY_ITEM_SEL, _this4.curSelLevelIndex);
            }
          }, false, 0.2);
          this.onClicked(this.leftArrBtn, function () {
            if (_this4.curSelLevelIndex > _this4.levelArray[0]) {
              _this4.curSelLevelIndex--;
              _this4.initBtnData();
              _this4.updateLevelData(dataList);
              _this4.updateLvPoint();
              gloEvent.emit(EventName.ON_VIP_ACTY_ITEM_SEL, _this4.curSelLevelIndex);
            }
          }, false, 0.2);
        }

        /**
         * 更新等级按钮位置
         */;
        _proto.updateLvPoint = function updateLvPoint() {
          for (var i = 0; i < this.vipPointChildren.length; i++) {
            this.vipPointChildren[i].setPosition((this.levelArray[i] - this.curSelLevelIndex + 1) * this.targetIndex + this.startPos, 0);
          }
        };
        _proto.initBtnData = function initBtnData() {
          if (this.curSelLevelIndex == this.levelArray[0]) {
            this.leftArrBtn.active = false;
          } else {
            this.leftArrBtn.active = true;
          }
          if (this.curSelLevelIndex == this.levelArray[this.levelArray.length - 1]) {
            this.rightArrBtn.active = false;
          } else {
            this.rightArrBtn.active = true;
          }
        };
        _proto.updateLevelData = function updateLevelData(data) {
          var blueData = null;
          var redData = null;
          for (var i = 0; i < data.length; i++) {
            var vipLv = data[i].pbfixActivityLevel;
            if (vipLv == this.curSelLevelIndex) {
              if (blueData == null) {
                blueData = data[i];
              } else {
                redData = data[i];
              }
            }
          }
          this.addBuyData(blueData, redData);
        };
        _proto.addBuyData = function addBuyData(blueData, redData) {
          var _this5 = this;
          if (blueData != null && redData != null) {
            //  不能购买 1能购买 2已购买3等级只能购买一个
            var blueStatus = blueData.pbfixStatus;
            var redStatus = redData.pbfixStatus;
            if (blueStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_PURCHASED || redStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_PURCHASED) {
              //已购买
              this.buyNode.active = false;
              this.receiveNode.active = true;
              if (blueStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_PURCHASED) {
                this.receiveNode.getComponent(VipReceiveManage).addReceiveData(blueData.pbfixRewards, blueData.pbfixId, function (vipLv) {
                  _this5.getBuyVipActivityList(_this5.curSelLevelIndex);
                }, blueData.pbfixActivityLevel);
              } else {
                this.receiveNode.getComponent(VipReceiveManage).addReceiveData(redData.pbfixRewards, redData.pbfixId, function (vipLv) {
                  _this5.getBuyVipActivityList(_this5.curSelLevelIndex);
                }, redData.pbfixActivityLevel);
              }
            } else {
              this.buyNode.active = true;
              this.receiveNode.active = false;
              this.buyNode.getComponent(VipActivityShop).initD(blueData, redData, function (vipLv) {
                _this5.getBuyVipActivityList(vipLv);
              });
            }
          }
        };
        _proto.showDepositedUsersView = function showDepositedUsersView() {
          if (this.allMoney.length > 0) {
            console.log(this.allMoney);
            this.buyPlayerMarqueeContentNode.removeAllChildren();
            //随机一个姓名or金额
            this.schedule(this.updateUserData, 1.5);
          }
        };
        _proto.updateUserData = function updateUserData() {
          var nametxt = Utils.setRandomDeposit();
          var money = this.allMoney[Math.floor(Math.random() * this.allMoney.length)];
          var bottomItem = instantiate(this.buyPlayerPrefab);
          bottomItem.setPosition(0, -50, 0);
          bottomItem.getComponent(RechargeRolling).initD(nametxt, money);
          this.buyPlayerMarqueeContentNode.addChild(bottomItem);
          tween(bottomItem).to(0.5, {
            position: new Vec3(0, 0, 0)
          }, {
            easing: "quadOut"
          }).delay(0.5).to(0.5, {
            position: new Vec3(0, 50, 0)
          }, {
            easing: "quadOut"
          }).call(function () {
            if (bottomItem != null) {
              bottomItem.destroy();
            }
          }).start();
        }

        /**
         * 初始化我的vip数据
         */;
        _proto.initMyVipData = function initMyVipData() {
          var _gameDataMgr$userInfo, _gameDataMgr$vipLvLis, _gameDataMgr$userInfo2, _lvConfig$nextLv;
          var myVipLevel = (_gameDataMgr$userInfo = gameDataMgr.userInfo.pbfixVip) != null ? _gameDataMgr$userInfo : 0;
          this.vipLevelLabelNode.getComponent(Label).string = myVipLevel + "";
          this.vipUpgradeRechargeLabelNode.getComponent(Label).string = safetyNum((_gameDataMgr$vipLvLis = gameDataMgr.vipLvList[myVipLevel + 1]) == null ? void 0 : _gameDataMgr$vipLvLis.pbfixTotalRecharge).cToRateNum() + "";
          this.vipLevelIcon.loadImg("activity/vip/img/bg_vip_level_" + CommonUtils.getVipIconIndex(myVipLevel), BundleName.HALL, this.node);
          var lvConfig = gameDataMgr.vipLvList;
          var nextLv = myVipLevel;
          if (lvConfig[myVipLevel + 1]) {
            nextLv = myVipLevel + 1;
          }
          var totalRecharge = safetyNum((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixTotalRechargeAmount).cToRateNum();
          var nextRecharge = safetyNum((_lvConfig$nextLv = lvConfig[nextLv]) == null ? void 0 : _lvConfig$nextLv.pbfixTotalRecharge).cToRateNum();
          var progress = totalRecharge / nextRecharge;
          if (progress > 0) {
            progress = Math.max(0.1, progress); // 最小进度0.1
          }

          var curRechargeText = Utils.changeMoneyUnit(totalRecharge, 3, 1);
          var nextRechargeText = Utils.changeMoneyUnit(nextRecharge, 3, 1);
          this.vipUpgradeRechargeLabelNode.getComponent(Label).string = curRechargeText + "/" + nextRechargeText;
          this.vipLevelProgressBar.progress = progress;
          var remainRecahrge = nextRecharge - totalRecharge;
          var richText = "<color=#FFFFFF>Only </color><color=#48FF00>" + Utils.changeMoneyUnit(remainRecahrge, 3, 1) + "</color><color=#FFFFFF> experience points left to reach </color><color=#FFF000>V" + nextLv + "</color>";
          this.vipLevelTipsRichText.string = richText;
        }

        // 判断当前是否有可领取的vip权益
        ;

        _proto.initReddot = function initReddot() {
          var hasReward = false;
          for (var i = 0; i < this.data.length; i++) {
            var itemData = this.data[i];
            var pbfixRewards = itemData.pbfixRewards || [];
            for (var j = 0; j < pbfixRewards.length; j++) {
              var reward = pbfixRewards[j];
              if (reward.pbfixStatus == 1) {
                hasReward = true;
                break;
              }
            }
          }
          if (hasReward) {
            // 将红点加入到gameDataMgr.redDotSet中
            gameDataMgr.redDotSet.add(RedDotType.RED_DOT_VIP_ACTIVITY);
            gloEvent.emit(EventName.RED_DOT_SHOW, {
              type: RedDotType.RED_DOT_VIP_ACTIVITY
            });
          } else {
            // 将红点从gameDataMgr.redDotSet中移除
            gameDataMgr.redDotSet["delete"](RedDotType.RED_DOT_VIP_ACTIVITY);
            gloEvent.emit(EventName.RED_DOT_HIDE, {
              type: RedDotType.RED_DOT_VIP_ACTIVITY
            });
          }
        }

        // 获取当前可领取权益的下标
        ;

        _proto.getVipRewardIndex = function getVipRewardIndex() {
          for (var i = 0; i < this.data.length; i++) {
            var itemData = this.data[i];
            var pbfixRewards = itemData.pbfixRewards || [];
            for (var j = 0; j < pbfixRewards.length; j++) {
              var reward = pbfixRewards[j];
              if (reward.pbfixStatus == 1) {
                return i;
              }
            }
          }
          return -1;
        };
        return VipActivity;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "leftArrBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rightArrBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "buyNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "receiveNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "activityLevelLvContentNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "activityLevelPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "closeBtnNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "helpBtnNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "buyPlayerMarqueeContentNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "buyPlayerPrefab", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "vipLevelLabelNode", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "vipLevelIcon", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "vipUpgradeRechargeLabelNode", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "vipLevelProgressBar", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "vipLevelTipsRichText", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "baseNode", [_dec17], {
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

System.register("chunks:///_virtual/VipActivityShop.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './PayUtils.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, MKStaticViewBase, NGame, gameDataMgr, pbfixVipActivityStatus, pbfixPaymentSource, GoogleAnalytics, GAEvent, PayUtils, safetyNum, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      pbfixVipActivityStatus = module.pbfixVipActivityStatus;
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
      cclegacy._RF.push({}, "751bfE7ESpKtbb6gpGaEWKl", "VipActivityShop", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * VIP充值活动，购买列表
       */
      var VipActivityShop = exports('VipActivityShop', (_dec = ccclass('VipActivityShop'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Label
      }), _dec6 = property({
        type: Label
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Label
      }), _dec10 = property({
        type: Label
      }), _dec11 = property({
        type: Label
      }), _dec12 = property({
        type: Label
      }), _dec13 = property({
        type: Label
      }), _dec14 = property({
        type: Node
      }), _dec15 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(VipActivityShop, _MKStaticViewBase);
        function VipActivityShop() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "item1Day1PriceLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item1Day2PriceLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item1Day3PriceLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item1ExtraLabel", _descriptor4, _assertThisInitialized(_this));
          // 额外比例1 
          _initializerDefineProperty(_this, "item1PriceLabel", _descriptor5, _assertThisInitialized(_this));
          // 价格1 
          _initializerDefineProperty(_this, "item1BuyBtn", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item1LockNode", _descriptor7, _assertThisInitialized(_this));
          // ===================================
          _initializerDefineProperty(_this, "item2Day1PriceLabel", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item2Day2PriceLabel", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item2Day3PriceLabel", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item2ExtraLabel", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item2PriceLabel", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "item2BuyBtn", _descriptor13, _assertThisInitialized(_this));
          _this.callback = null;
          _initializerDefineProperty(_this, "item2LockNode", _descriptor14, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = VipActivityShop.prototype;
        /**初始化数据 */
        _proto.initD = function initD(blueData, redData, callback) {
          var _this2 = this;
          this.callback = callback;
          var listBlue = blueData.pbfixRewards;
          for (var i = 0; i < listBlue.length; i++) {
            var item = listBlue[i];
            var receiveType = item.pbfixRewardType;
            var value = safetyNum(item == null ? void 0 : item.pbfixRewardValue).cToRateNum();
            var str = "$";
            if (receiveType == 2) {
              str = "X";
              value = item.pbfixRewardValue;
            }
            if (Utils.arraysEqual(item.pbfixReceivableDays, [1])) {
              this.item1Day1PriceLabel.string = str + value;
            } else if (Utils.arraysEqual(item.pbfixReceivableDays, [2])) {
              this.item1Day2PriceLabel.string = str + value;
              // } else if (Utils.arraysEqual(item.receivableDays, [2, 3])) {
              //     this.blueTwoDayFreeLabel.string = str + value
            } else if (Utils.arraysEqual(item.pbfixReceivableDays, [3])) {
              this.item1Day3PriceLabel.string = str + value;
            }
          }
          this.item1ExtraLabel.string = "+" + safetyNum(blueData == null ? void 0 : blueData.pbfixRechargeGiftRate).cToFeeRateNum() + "% Extra";
          this.item1PriceLabel.string = "$ " + safetyNum(blueData == null ? void 0 : blueData.pbfixRechargeAmount).cToRateNum();
          var listRed = redData.pbfixRewards;
          for (var _i = 0; _i < listRed.length; _i++) {
            var _item = listRed[_i];
            var _receiveType = _item.pbfixRewardType;
            var _value = safetyNum(_item == null ? void 0 : _item.pbfixRewardValue).cToRateNum();
            var _str = "$";
            if (_receiveType == 2) {
              _str = "X";
              _value = _item.pbfixRewardValue;
            }
            if (Utils.arraysEqual(_item.pbfixReceivableDays, [1])) {
              this.item2Day1PriceLabel.string = _str + _value;
            } else if (Utils.arraysEqual(_item.pbfixReceivableDays, [2])) {
              this.item2Day2PriceLabel.string = _str + _value;
              // } else if (Utils.arraysEqual(item.receivableDays, [2, 3])) {
              //     this.redTwoDayFreeLabel.string = str + value
            } else if (Utils.arraysEqual(_item.pbfixReceivableDays, [3])) {
              this.item2Day3PriceLabel.string = _str + _value;
            }
          }
          this.item2ExtraLabel.string = "+" + safetyNum(redData == null ? void 0 : redData.pbfixRechargeGiftRate).cToFeeRateNum() + "% Extra";
          this.item2PriceLabel.string = "$ " + safetyNum(redData == null ? void 0 : redData.pbfixRechargeAmount).cToRateNum();
          if (blueData.pbfixStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_CAN_PURCHASE) {
            this.item1LockNode.active = false;
            this.onClicked(this.item1BuyBtn, function () {
              if (!_this2.verifyCanBuy()) {
                _this2.showVipLevelToast();
                return;
              }
              _this2.payRechargeOrder(blueData.pbfixRechargeAmount, blueData.pbfixId, blueData.pbfixActivityLevel);
            });
          } else {
            // this.blueBuyBtnNode.getComponent(Button).enabled=false
            this.item1LockNode.active = true;
          }
          if (redData.pbfixStatus == pbfixVipActivityStatus.pbfixVIP_ACTIVITY_STATUS_CAN_PURCHASE) {
            this.item2LockNode.active = false;
            this.onClicked(this.item2BuyBtn, function () {
              if (!_this2.verifyCanBuy()) {
                _this2.showVipLevelToast();
                return;
              }
              _this2.payRechargeOrder(redData.pbfixRechargeAmount, redData.pbfixId, redData.pbfixActivityLevel);
            });
          } else {
            //   this.redBuyBtnNode.getComponent(Button).enabled=false
            this.item2LockNode.active = true;
          }
        };
        _proto.payRechargeOrder = function payRechargeOrder(price, activityId, vipLv) {
          var _this3 = this;
          GoogleAnalytics.track(GAEvent.VIP_RECHARGE_PACKAGE);
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_VIP_ACTIVITY, price, activityId, function () {
            if (_this3.isValid) {
              _this3.callback(vipLv);
            }
          });
        }

        // 验证是否能购买
        ;

        _proto.verifyCanBuy = function verifyCanBuy() {
          var _gameDataMgr$userInfo;
          // 玩家vip等级必须大于0
          var myVipLevel = (_gameDataMgr$userInfo = gameDataMgr.userInfo.pbfixVip) != null ? _gameDataMgr$userInfo : 0;
          if (myVipLevel <= 0) {
            return false;
          }
          return true;
        }

        // vip等级不够提示吐司
        ;

        _proto.showVipLevelToast = function showVipLevelToast() {
          NGame.tips.toast("VIP Exclusive Event".i18nStr());
        };
        return VipActivityShop;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "item1Day1PriceLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "item1Day2PriceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "item1Day3PriceLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "item1ExtraLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "item1PriceLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "item1BuyBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "item1LockNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "item2Day1PriceLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "item2Day2PriceLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "item2Day3PriceLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "item2ExtraLabel", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "item2PriceLabel", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "item2BuyBtn", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "item2LockNode", [_dec15], {
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

System.register("chunks:///_virtual/VipLevelPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GloTitleBar.ts', './GameCfg.ts', './Constant.ts', './Decorators.ts', './VScrollView.ts', './MKViewBase.ts', './GameDataMgr.ts', './CommonUtils.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ScrollView, UITransform, Node, GloTitleBar, GameCfg, EventName, BundleName, inject, VirtualScrollView, MKViewBase, gameDataMgr, CommonUtils, safetyNum, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
      UITransform = module.UITransform;
      Node = module.Node;
    }, function (module) {
      GloTitleBar = module.GloTitleBar;
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      EventName = module.EventName;
      BundleName = module.BundleName;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      CommonUtils = module.CommonUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "fa393wN6XhKHpr7db49Bhbq", "VipLevelPage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var VipLevelPage = exports('VipLevelPage', (_dec = ccclass('VipLevelPage'), _dec2 = inject("ScrollView", ScrollView), _dec3 = inject("ScrollView/view/content/bottomBg/vScrollView", VirtualScrollView), _dec4 = inject("GloTitleBar", GloTitleBar), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(VipLevelPage, _MKViewBase);
        function VipLevelPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "outerScrollView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "listView", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gloTitleBar", _descriptor3, _assertThisInitialized(_this));
          _this.allNode = null;
          return _this;
        }
        var _proto = VipLevelPage.prototype;
        _proto.open = function open() {
          this.initUi();
          this.onMsg(EventName.REQUEST_EDGE_SWIPE_BACK, this.onEdgeSwipeBack);
        };
        _proto.initUi = function initUi() {
          var _gameDataMgr$userInfo,
            _gameDataMgr$userInfo2,
            _lvConfig$nextLv,
            _this2 = this;
          this.gloTitleBar.initBar("VIP Level".i18nStr(), this.closeAndDestroy.bind(this));
          this.allNode = this.getAllChildrenMap(this.node);
          var myVipLevel = (_gameDataMgr$userInfo = gameDataMgr.userInfo.pbfixVip) != null ? _gameDataMgr$userInfo : 0;
          this.allNode.label_vip_level.setText("" + myVipLevel); //  vip图标内等级数字
          this.allNode.bg_vip_level.loadImg("activity/vip/img/bg_vip_level_" + CommonUtils.getVipIconIndex(myVipLevel), BundleName.HALL, this.node);
          var totalRecharge = safetyNum((_gameDataMgr$userInfo2 = gameDataMgr.userInfo) == null ? void 0 : _gameDataMgr$userInfo2.pbfixTotalRechargeAmount).cToRateNum();
          var lvConfig = gameDataMgr.vipLvList;
          var nextLv = myVipLevel;
          if (lvConfig[myVipLevel + 1]) {
            nextLv = myVipLevel + 1;
          }
          var nextRecharge = safetyNum((_lvConfig$nextLv = lvConfig[nextLv]) == null ? void 0 : _lvConfig$nextLv.pbfixTotalRecharge).cToRateNum();
          this.allNode.vipTag4.setText(Utils.changeMoneyUnit(totalRecharge, 2));
          this.allNode.vipTag5.setText("/" + Utils.changeMoneyUnit(nextRecharge, 2));
          this.allNode.pro.getComponent(UITransform).width = 638 * (totalRecharge / nextRecharge);
          this.allNode.barbb.x = 638 * (totalRecharge / nextRecharge);
          this.listView.renderItemFn = function (item, index) {
            var _data$pbfixVipLevel, _data$pbfixTotalRecha, _data$pbfixDailyWLimi;
            item.on(Node.EventType.TOUCH_START, function () {
              _this2.outerScrollView.vertical = false;
            });
            item.on(Node.EventType.TOUCH_MOVE, function () {
              _this2.outerScrollView.vertical = false;
            });
            item.on(Node.EventType.TOUCH_END, function () {
              _this2.scheduleOnce(function () {
                _this2.outerScrollView.vertical = true;
              }, 0.1);
            });
            item.on(Node.EventType.TOUCH_CANCEL, function () {
              _this2.scheduleOnce(function () {
                _this2.outerScrollView.vertical = true;
              }, 0.1);
            });
            var data = lvConfig[index];
            item.active = true;
            var curLV = (_data$pbfixVipLevel = data.pbfixVipLevel) != null ? _data$pbfixVipLevel : 0;
            var priceLayout = item.child("priceLayout");
            item.child("lvtitle").setText("Level".i18nStr() + " " + curLV);
            item.child("icon_vip").child("label_vip_level").setText(curLV);
            item.child("icon_vip").loadImg("activity/vip/img/bg_vip_level_" + CommonUtils.getVipIconIndex(curLV), BundleName.HALL, _this2.node);
            priceLayout.child("Price").setText(Utils.changeMoneyUnit(data == null || (_data$pbfixTotalRecha = data.pbfixTotalRecharge) == null ? void 0 : _data$pbfixTotalRecha.cToRateNum(), 3));
            priceLayout.child("curreny").setText(GameCfg.currency_abbreviation);
            item.child("node_layout_label").child("value1").setText("ReleaseBack Privileges".i18nStr());
            item.child("node_layout_label").child("value2").setText("ReleaseBack fee".i18nStr() + safetyNum(data == null ? void 0 : data.pbfixWFeeRate).cToFeeRateNum() + "%");
            item.child("node_layout_label").child("value3").setText("ReleaseBack limit".i18nStr() + Utils.changeMoneyUnit(data == null || (_data$pbfixDailyWLimi = data.pbfixDailyWLimit) == null ? void 0 : _data$pbfixDailyWLimi.cToRateNum(), 2) + (" (" + "ReleaseBack limit2".i18nStr() + ")"));
            item.child("node_layout_label").child("value4").setText("Number of ReleaseBack".i18nStr() + safetyNum(data == null ? void 0 : data.pbfixDailyWTimesLimit) + "Time_Day".i18nStr());
            item.child("myViptg").active = curLV == myVipLevel;
          };
          this.listView.refreshList(lvConfig);
          this.scheduleOnce(function () {
            _this2.listView.scrollToIndex(lvConfig.findIndex(function (lv) {
              return lv.pbfixVipLevel == myVipLevel;
            }));
          });
        };
        return VipLevelPage;
      }(MKViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "outerScrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gloTitleBar", [_dec4], {
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

System.register("chunks:///_virtual/VipLvItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKExport.ts', './MKStaticViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Sprite, SpriteFrame, EventName, gloEvent, MKStaticViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      gloEvent = module.default;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "7b1ceqbsRNJDIXIOXocXpbY", "VipLvItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * VIP充值活动等级按钮item
       */
      var VipLvItem = exports('VipLvItem', (_dec = ccclass('VipLvItem'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Sprite
      }), _dec4 = property({
        type: [SpriteFrame]
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(VipLvItem, _MKStaticViewBase);
        function VipLvItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "vipLvLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipLvSprite", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipLvSpriteFrame", _descriptor3, _assertThisInitialized(_this));
          _this.activityLevel = 0;
          // 活动等级
          _this.callback = null;
          return _this;
        }
        var _proto = VipLvItem.prototype;
        _proto.onLoad = function onLoad() {
          this.onMsg(EventName.ON_VIP_ACTY_ITEM_SEL, this.onItemSel.bind(this));
        };
        _proto.initD = function initD(vipLv, userLv, callback) {
          var _this2 = this;
          this.activityLevel = vipLv;
          this.callback = callback;
          // if (userLv >= vipLv) { // 已解锁/可购买状态
          //     this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[1] // 选定状态
          // } else {
          //     this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[0] // 未解锁
          // }
          if (userLv == vipLv) {
            // 已解锁/可购买状态
            this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[1]; // 选定状态
          } else {
            this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[0]; // 未解锁
          }

          this.vipLvLabel.string = "LV" + vipLv;
          this.onClicked(this.node, function () {
            if (_this2.callback != null) {
              _this2.callback(_this2.activityLevel);
            }
            gloEvent.emit(EventName.ON_VIP_ACTY_ITEM_SEL, _this2.activityLevel);
          });
        };
        _proto.onItemSel = function onItemSel(selLevel) {
          if (this.activityLevel == selLevel) {
            this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[1]; // 选定状态
          } else {
            this.vipLvSprite.spriteFrame = this.vipLvSpriteFrame[0]; // 未选定状态
          }
        };

        return VipLvItem;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "vipLvLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vipLvSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vipLvSpriteFrame", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VipReceiveItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './WebApiEnums.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Sprite, SpriteFrame, Node, MKStaticViewBase, pbfixClaimedStatus, pbfixRewardType, safetyNum;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      pbfixClaimedStatus = module.pbfixClaimedStatus;
      pbfixRewardType = module.pbfixRewardType;
    }, function (module) {
      safetyNum = module.safetyNum;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "654c9OrtKlNtKLlEA6Oh3JE", "VipReceiveItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * VIP充值活动权益领取item
       */
      var VipReceiveItem = exports('VipReceiveItem', (_dec = ccclass('VipReceiveItem'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Sprite
      }), _dec5 = property({
        type: [SpriteFrame]
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(VipReceiveItem, _MKStaticViewBase);
        function VipReceiveItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "dayLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moneyLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "iconSprite", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "iconSpriteFrame", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "textLabelNode", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "getBtnNode", _descriptor6, _assertThisInitialized(_this));
          _this.callback = null;
          return _this;
        }
        var _proto = VipReceiveItem.prototype;
        _proto.initD = function initD(data, callback) {
          var _this2 = this;
          this.callback = callback;
          var receiveType = data.pbfixRewardType; //领取类型 1领取金额 2领取游戏Spin次数
          var status = data.pbfixStatus; //0不能领取 1能领取 2已领取 3已失效 4不满足条件
          var days = data.pbfixReceivableDays;
          if (days.length > 1) {
            this.dayLabel.string = "DAY " + days[0] + " Or " + days[1];
          } else {
            this.dayLabel.string = "DAY " + days[0];
          }
          switch (status) {
            case pbfixClaimedStatus.pbfixCLAIMED_STATUS_UNDEFINED:
            case pbfixClaimedStatus.pbfixCLAIMED_STATUS_NOT_YET_AVAILABLE:
              // 不可领取
              this.textLabelNode.active = false;
              this.getBtnNode.active = true;
              this.getBtnNode.getComponent(Sprite).grayscale = true;
              break;
            case pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE:
              // 可领取
              this.textLabelNode.active = false;
              this.getBtnNode.active = true;
              this.getBtnNode.getComponent(Sprite).grayscale = false;
              this.onClicked(this.getBtnNode, function () {
                if (_this2.callback != null) {
                  _this2.callback();
                }
              });
              break;
            case pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMED:
              // 已领取
              this.textLabelNode.active = true;
              this.getBtnNode.active = false;
              this.textLabelNode.setText("Claimed".i18nStr());
              break;
            case pbfixClaimedStatus.pbfixCLAIMED_STATUS_EXPIRED:
              // 已过期
              this.textLabelNode.active = true;
              this.getBtnNode.active = false;
              this.textLabelNode.setText("Expired".i18nStr());
              break;
          }
          if (receiveType == pbfixRewardType.pbfixREWARD_TYPE_FREE_SPIN) {
            // this.iconSprite.spriteFrame = this.iconSpriteFrame[1]
            this.iconSprite.spriteFrame = this.iconSpriteFrame[0];
            this.moneyLabel.string = "X" + safetyNum(data == null ? void 0 : data.pbfixRewardValue);
          } else {
            this.iconSprite.spriteFrame = this.iconSpriteFrame[0];
            this.moneyLabel.string = "$" + safetyNum(data == null ? void 0 : data.pbfixRewardValue).cToRateNum();
          }
        };
        return VipReceiveItem;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dayLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iconSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "iconSpriteFrame", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "textLabelNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "getBtnNode", [_dec7], {
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

System.register("chunks:///_virtual/VipReceiveManage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './NetConstant.ts', './NGame.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './VipReceiveItem.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, Sprite, instantiate, MKStaticViewBase, CMD_SUCCESS, NGame, HttpPbFunc, pbfixClaimedStatus, VipReceiveItem;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Sprite = module.Sprite;
      instantiate = module.instantiate;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      CMD_SUCCESS = module.CMD_SUCCESS;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
    }, function (module) {
      pbfixClaimedStatus = module.pbfixClaimedStatus;
    }, function (module) {
      VipReceiveItem = module.VipReceiveItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "42af6Noqa5KU78hx5wsQzCo", "VipReceiveManage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * vip充值活动，可领取权益页面
       */
      var VipReceiveManage = exports('VipReceiveManage', (_dec = ccclass('VipReceiveManage'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(VipReceiveManage, _MKStaticViewBase);
        function VipReceiveManage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "vipReceiveNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vipReceivePrefab", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "claimAllBtn", _descriptor3, _assertThisInitialized(_this));
          // 领取所有按钮 
          _this.callBack = null;
          _this.vipLv = 0;
          _this.activityId = 0;
          return _this;
        }
        var _proto = VipReceiveManage.prototype;
        _proto.addReceiveData = function addReceiveData(data, activity_id, callback, vipLv) {
          var _this2 = this;
          this.activityId = activity_id;
          this.vipLv = vipLv;
          this.callBack = callback;
          this.vipReceiveNode.removeAllChildren();
          this.offClicked(this.claimAllBtn);
          var allRewards = [];
          var _loop = function _loop() {
            var reward = data[i];
            var vipReceiveItem = instantiate(_this2.vipReceivePrefab);
            _this2.vipReceiveNode.addChild(vipReceiveItem);
            vipReceiveItem.getComponent(VipReceiveItem).initD(reward, function () {
              _this2.receiveMoney([reward]);
            });
            if (reward.pbfixStatus == pbfixClaimedStatus.pbfixCLAIMED_STATUS_CLAIMABLE) {
              allRewards.push(reward);
            }
          };
          for (var i = 0; i < data.length; i++) {
            _loop();
          }

          // 一键领取
          if (allRewards.length > 0) {
            this.claimAllBtn.getComponent(Sprite).grayscale = false;
            this.onClicked(this.claimAllBtn, function () {
              if (!_this2.claimAllBtn.getComponent(Sprite).grayscale) {
                _this2.receiveMoney(allRewards);
              }
            });
          } else {
            this.claimAllBtn.getComponent(Sprite).grayscale = true;
          }
        }

        /**
         * 领取权益
         * @param rewards 
         */;
        _proto.receiveMoney = function receiveMoney(rewards) {
          var _this3 = this;
          var rewardIds = [];
          rewards.forEach(function (reward) {
            rewardIds.push(reward.pbfixId);
          });
          HttpPbFunc.pbfixVipActivityRewardReq(this.node, this.activityId, rewardIds, function (result) {
            if (result.pbfixCode == CMD_SUCCESS) {
              _this3.openRewardView(rewards);
              _this3.callBack == null || _this3.callBack(_this3.vipLv);
            } else {
              NGame.tips.toast("VipAct_Reward Fail -> " + result.pbfixMsg);
            }
          });
        };
        _proto.openRewardView = function openRewardView(rewards) {
          // const isGetMoney = rewards.filter(reward => reward.rewardType == 1).length > 0;
          // const isGetFreeSpin = rewards.filter(reward => reward.rewardType == 2).length > 0;

          var totalRewardNumber = 0;
          rewards.forEach(function (reward) {
            totalRewardNumber += reward.pbfixRewardValue;
          });
          NGame.dialog.showGetRewardDialog({
            rewardNum: totalRewardNumber.cToRateNum()
          });

          //免费游戏次数
          // if (data.free_spin > 0) {
          //     GlobalManager.popups.FreeSpinsMadnessPopPrefab.data = {
          //         free_spain_num: data.free_spin,
          //         type: 1,
          //     };
          //     GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.FreeSpinsMadnessPopPrefab);
          // }
          // //money
          // if (data.money > 0) {
          //     GlobalManager.popups.RewardView.data = {
          //         money: data.money
          //     }
          //     GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.RewardView)
          // }
          // // UserDate.getInstance().userProfile.money += Price
          // if (this.callBack != null) {
          //     this.callBack(this.vipLv)
          // }
        };

        return VipReceiveManage;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "vipReceiveNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vipReceivePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "claimAllBtn", [_dec4], {
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

System.register("chunks:///_virtual/WeeklyCardAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts', './CheckinAct.ts', './UIHelper.ts', './GoogleAnatytics.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Button, Sprite, RATE_FEE, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, isResponseValid, pbfixPaymentSource, PayUtils, Utils, CheckinAct, UIHelper, UIPath, GoogleAnalytics, GAEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
      Sprite = module.Sprite;
    }, function (module) {
      RATE_FEE = module.RATE_FEE;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      CheckinAct = module.CheckinAct;
    }, function (module) {
      UIHelper = module.UIHelper;
      UIPath = module.UIPath;
    }, function (module) {
      GoogleAnalytics = module.GoogleAnalytics;
      GAEvent = module.GAEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ed644GCALFJF7UkGiE8eEas", "WeeklyCardAct", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var WeeklyCardAct = exports('WeeklyCardAct', (_dec = ccclass('WeeklyCardAct'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(WeeklyCardAct, _MKViewBase);
        function WeeklyCardAct() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = WeeklyCardAct.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          GoogleAnalytics.track(GAEvent.DIALOG_WEEK_CARD);
          this.onClicked(this.allNode.CloseBtn, this.closeView.bind(this));
          this.initUi();
          this.reloadData();
          // Common.JNI_callFiveBase(`${FireBase_EVENT_ENUM.dayscard}_click`);
        };

        _proto.closeView = function closeView() {
          this.close();
        };
        _proto.initUi = function initUi(isInit) {
          var _allNum,
            _day7SingData$pbfixOr,
            _day7SingData$pbfixPr,
            _this2 = this;
          if (isInit === void 0) {
            isInit = true;
          }
          var day7SingData = gameDataMgr.weeklyCardData;
          var claimList = day7SingData.pbfixClaimItems;
          var dayRescueList = gameDataMgr.hallConf.pbfixBankruptcyConfig;
          var day7SingRescueList = gameDataMgr.hallConf.pbfixPurchasedWeeklyCardBankruptcyConfig;
          this.allNode.BuyBtn.active = false;
          this.allNode.TogetBtn.active = false;
          this.allNode.getBtn.active = false;
          var allNum = 0;
          claimList.forEach(function (claim) {
            allNum += claim.pbfixConf.pbfixBenefit.pbfixBenefitValue;
          });
          // log("allNum",allNum)
          // log("cardInfo.first_price",cardInfo.first_price)
          this.allNode.tag1v2.getComponent(Label).string = Utils.changeMoneyUnit((_allNum = allNum) == null ? void 0 : _allNum.cToRateNum(), 1);
          this.allNode.tag2v1.getComponent(Label).string = Math.floor(allNum / day7SingData.pbfixPrice) * RATE_FEE + "%";
          var pp = (day7SingRescueList[0] + dayRescueList[0]) / dayRescueList[0];
          this.allNode.tag3v1.getComponent(Label).string = Math.ceil(pp * RATE_FEE) + "%";
          this.allNode.Original.getComponent(Label).string = "Original Price".i18nStr() + Utils.changeMoneyUnit(day7SingData == null || (_day7SingData$pbfixOr = day7SingData.pbfixOriPrice) == null ? void 0 : _day7SingData$pbfixOr.cToRateNum(), 1);
          this.allNode.allprice.getComponent(Label).string = Utils.changeMoneyUnit(day7SingData == null || (_day7SingData$pbfixPr = day7SingData.pbfixPrice) == null ? void 0 : _day7SingData$pbfixPr.cToRateNum(), 1);
          var curCanGet = false;
          var curRewardNum = 0;
          // 1可领取，2已领取， 3已过期， 4不可领取不满足条件
          claimList.forEach(function (claim, idx) {
            var _claim$pbfixConf;
            var bg = _this2.allNode["Day" + (idx + 1) + "Bg"];
            bg.getChildByName("Price").getComponent(Label).string = Utils.changeMoneyUnit(claim == null || (_claim$pbfixConf = claim.pbfixConf) == null || (_claim$pbfixConf = _claim$pbfixConf.pbfixBenefit) == null || (_claim$pbfixConf = _claim$pbfixConf.pbfixBenefitValue) == null ? void 0 : _claim$pbfixConf.cToRateNum(), 1);
            bg.getChildByName("wc").active = claim.pbfixStatus == 2;
            bg.getChildByName("cuoguo").active = claim.pbfixStatus == 3;
            bg.child("sel").active = claim.pbfixStatus == 1;
            if (claim.pbfixStatus == 1) {
              curCanGet = true;
              curRewardNum = claim.pbfixConf.pbfixBenefit.pbfixBenefitValue;
            }
          });
          if (!isInit) {
            if (day7SingData.pbfixCanPurchase) {
              this.popUpAndClicked(this.allNode.BuyBtn, this.buyCard.bind(this, day7SingData.pbfixPrice));
            } else if (curCanGet) {
              this.popUpAndClicked(this.allNode.getBtn, this.getReward.bind(this, curRewardNum));
            } else if (day7SingData.pbfixIsPurchased) {
              // 如果已购买，则不可点击状态
              this.allNode.TogetBtn.getComponent(Button).interactable = false;
              this.allNode.TogetBtn.getComponent(Sprite).grayscale = true;

              // this.popUpAndClicked(this.allNode.TogetBtn, this.ToGetBonus.bind(this))
              this.popUpAndClicked(this.allNode.TogetBtn, function () {});
            }
          }
        };
        _proto.getReward = function getReward(rewardNum) {
          var _this3 = this;
          HttpPbFunc.pbfixWeeklyCardBenefitClaimReq(this.node, function () {
            NGame.dialog.showGetRewardDialog({
              rewardNum: rewardNum.cToRateNum()
            });
            _this3.reloadData();
          });
        };
        _proto.buyCard = function buyCard(price) {
          var _this4 = this;
          GoogleAnalytics.track(GAEvent.WEEKCARD);
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_WEEKLY_CARD, price, 0, function () {
            if (_this4.isValid) {
              NGame.dialog.showGetRewardDialog({
                rewardNum: price.cToRateNum()
              });
              _this4.reloadData();
            }
          });
        };
        _proto.ToGetBonus = function ToGetBonus() {
          this.closeView();
          // NGame.uiManage.open(CheckinAct)
          UIHelper.openUI(CheckinAct, UIPath.CheckinAct);
          // GlobalRoot.instance.UiManager.showPopup(GlobalManager.popups.DaylyBonusView)
        };

        _proto.reloadData = function reloadData() {
          var _this5 = this;
          HttpPbFunc.pbfixWeeklyCardReq(this.node, function (result) {
            if (isResponseValid(result)) {
              _this5.initUi(false);
            }
          });
        };
        return WeeklyCardAct;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WeeklyCardRule.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKViewBase.ts', './NGame.ts', './GameDataMgr.ts', './UIController.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './PayUtils.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, MKViewBase, NGame, gameDataMgr, UIController, HttpPbFunc, isResponseValid, pbfixPaymentSource, PayUtils, safetyNum, Utils;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      UIController = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixPaymentSource = module.pbfixPaymentSource;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "2138fkE5uBNP5aVjY44+QIe", "WeeklyCardRule", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var WeeklyCardRule = exports('WeeklyCardRule', (_dec = ccclass('WeeklyCardRule'), _dec(_class = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(WeeklyCardRule, _MKViewBase);
        function WeeklyCardRule() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _this.allNode = null;
          return _this;
        }
        var _proto = WeeklyCardRule.prototype;
        _proto.onLoad = function onLoad() {
          this.allNode = UIController.getAllChildrenMap(this.node);
        };
        _proto.open = function open() {
          var _this2 = this;
          this.onClicked(this.allNode.closeBtn, function () {
            _this2.closeView();
          });
          this.initUi();
          this.reloadData();
        };
        _proto.initUi = function initUi() {
          var weeklyCardData = gameDataMgr.checkinActData;
          var weeklyCardList = gameDataMgr.hallConf.pbfixWeeklyCardConfig;
          var defaultRescueList = gameDataMgr.hallConf.pbfixBankruptcyConfig;
          var rescueList = gameDataMgr.hallConf.pbfixPurchasedWeeklyCardBankruptcyConfig;
          var checkinList = gameDataMgr.hallConf.pbfixPurchasedWeeklyCardCheckinConfig;
          var firstPrice = safetyNum(weeklyCardData == null ? void 0 : weeklyCardData.pbfixWeeklyCardPrice); // 底部充值按钮显示的金额
          // this.onClicked(this.allNode.BuyBtn, () => {
          //     this.buyCard(firstPrice)
          // })
          this.allNode.allPrice.setText(Utils.changeMoneyUnit(firstPrice.cToRateNum(), 1));
          for (var index = 0; index < 7; index++) {
            var _weeklyCardList$index, _ref, _checkinList$index;
            var bg = this.allNode["dayItem" + (index + 1)];
            bg.child("tt").setText(("Day " + (index + 1)).i18nStr());
            bg.child("value1").setText(Utils.changeMoneyUnit((_weeklyCardList$index = weeklyCardList[index]) == null || (_weeklyCardList$index = _weeklyCardList$index.pbfixBenefit) == null || (_weeklyCardList$index = _weeklyCardList$index.pbfixBenefitValue) == null ? void 0 : _weeklyCardList$index.cToRateNum(), 1));
            bg.child("value2").setText(Utils.changeMoneyUnit((_ref = defaultRescueList[index] + rescueList[index]) == null ? void 0 : _ref.cToRateNum(), 1));
            bg.child("value3").setText(Utils.changeMoneyUnit((_checkinList$index = checkinList[index]) == null || (_checkinList$index = _checkinList$index.pbfixBenefit) == null || (_checkinList$index = _checkinList$index.pbfixBenefitValue) == null ? void 0 : _checkinList$index.cToRateNum(), 1));
          }
        };
        _proto.buyCard = function buyCard(weeklyCardPrice) {
          var _this3 = this;
          PayUtils.goPay(pbfixPaymentSource.pbfixPAYMENT_SOURCE_WEEKLY_CARD, weeklyCardPrice, 0, function () {
            if (_this3.isValid) {
              NGame.dialog.showGetRewardDialog({
                rewardNum: weeklyCardPrice.cToRateNum()
              });
              HttpPbFunc.pbfixWeeklyCardBenefitClaimReq(_this3.node, function () {});
              _this3.reloadData();
            }
          });
        };
        _proto.closeView = function closeView() {
          this.close();
        };
        _proto.reloadData = function reloadData() {
          var _this4 = this;
          this.allNode.BuyBtn.active = false;
          HttpPbFunc.pbfixCheckinDataReq(this.node, function (result) {
            if (isResponseValid(result)) {
              _this4.initUi();
              if (!gameDataMgr.checkinActData.pbfixIsPurchasedWeeklyCard) {
                _this4.popUpAndClicked(_this4.allNode.BuyBtn, _this4.buyCard.bind(_this4, gameDataMgr.checkinActData.pbfixWeeklyCardPrice));
              }
            }
          });
        };
        return WeeklyCardRule;
      }(MKViewBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WidAccountInfo.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f8433rEiMxGE7Lnx9k3IwTQ", "WidAccountInfo", undefined);
      var WidAccountInfo = exports('WidAccountInfo', function WidAccountInfo() {
        this.email = "";
        this.cardAccountName = "";
        this.cardAccountNum = "";
        this.cardMonth = "";
        this.cardYear = "";
        this.cashAppAccount = "";
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WidAccountInfoView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './Decorators.ts', './MKStaticViewBase.ts', './NGame.ts', './Utils.ts', './WidAccountInfo.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, EditBox, tween, v3, WidAccountType, inject, MKStaticViewBase, NGame, Utils, WidAccountInfo;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      EditBox = module.EditBox;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      WidAccountType = module.WidAccountType;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      WidAccountInfo = module.WidAccountInfo;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "9d9ebKtGHxA0akUvoldyHHS", "WidAccountInfoView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var WidAccountInfoView = exports('WidAccountInfoView', (_dec = ccclass('WidAccountInfoView'), _dec2 = inject("emailNode", Node), _dec3 = inject("emailNode/input/EditBox", Node), _dec4 = inject("cardNode", Node), _dec5 = inject("cardNode/nameInput/EditBox", Node), _dec6 = inject("cardNode/accountInput/EditBox", Node), _dec7 = inject("cardNode/expireDateInput/monthInput/EditBox", Node), _dec8 = inject("cardNode/expireDateInput/yearInput/EditBox", Node), _dec9 = inject("CashAppNode", Node), _dec10 = inject("CashAppNode/input/EditBox", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(WidAccountInfoView, _MKStaticViewBase);
        function WidAccountInfoView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "emailNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "emailEditBox", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cardNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cardNameEditBox", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cardAccountEditBox", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "monthEditBox", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "yearEditBox", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cashAppNode", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cashAppAccountEditBox", _descriptor9, _assertThisInitialized(_this));
          _this.accountType = WidAccountType.WID_TYPE_PAY_PAL;
          // private infoValidCallback?: (isValid: boolean) => void;
          _this.curIsValid = false;
          _this.widChannel = void 0;
          _this.emailBgWarn = void 0;
          _this.cardnNameBgWarn = void 0;
          _this.cardnAccounBgWarn = void 0;
          _this.cardnMonthBgWarn = void 0;
          _this.cardnYearBgWarn = void 0;
          _this.cashAppAccountBgWarn = void 0;
          return _this;
        }
        var _proto = WidAccountInfoView.prototype;
        _proto.onLoad = function onLoad() {
          this.emailEditBox.on('text-changed', this.onEmailTextChanged, this);
          this.cardNameEditBox.on('text-changed', this.onCardInfoTextChanged, this);
          this.cardAccountEditBox.on('text-changed', this.onCardInfoTextChanged, this);
          this.monthEditBox.on('text-changed', this.onCardInfoTextChanged, this);
          this.yearEditBox.on('text-changed', this.onCardInfoTextChanged, this);
          this.cashAppAccountEditBox.on('text-changed', this.onCashAppAccountTextChanged, this);
          this.emailBgWarn = this.emailNode.getChildByPath("input/b1/bg_warn");
          this.cardnNameBgWarn = this.cardNode.getChildByPath("nameInput/b1/bg_warn");
          this.cardnAccounBgWarn = this.cardNode.getChildByPath("accountInput/b1/bg_warn");
          this.cardnMonthBgWarn = this.cardNode.getChildByPath("expireDateInput/monthInput/b1/bg_warn");
          this.cardnYearBgWarn = this.cardNode.getChildByPath("expireDateInput/yearInput/b1/bg_warn");
          this.cashAppAccountBgWarn = this.cashAppNode.getChildByPath("input/b1/bg_warn");
        }

        // setInfoValidCallback(infoValidCallback: (isValid: boolean) => void) {
        //     this.infoValidCallback = infoValidCallback;
        // }
        ;

        _proto.getAccountInfo = function getAccountInfo() {
          var accountInfo = new WidAccountInfo();
          if (this.accountType == WidAccountType.WID_TYPE_PAY_PAL) {
            accountInfo.email = this.emailEditBox.getComponent(EditBox).string;
          }
          if (this.accountType == WidAccountType.WID_TYPE_CARD) {
            accountInfo.cardAccountName = this.cardNameEditBox.getComponent(EditBox).string;
            accountInfo.cardAccountNum = this.cardAccountEditBox.getComponent(EditBox).string;
            accountInfo.cardMonth = this.monthEditBox.getComponent(EditBox).string;
            accountInfo.cardYear = this.yearEditBox.getComponent(EditBox).string;
          }
          if (this.accountType == WidAccountType.WID_TYPE_CASH_APP) {
            accountInfo.cashAppAccount = this.cashAppAccountEditBox.getComponent(EditBox).string;
          }
          return accountInfo;
        };
        _proto.showView = function showView(widChannel) {
          this.widChannel = widChannel;
          this.accountType = widChannel.pbfixAccountType || WidAccountType.WID_TYPE_PAY_PAL;
          this.resetView();
          // this.cashAppNode.getChildByPath(`input/tagNode/InvalidNode/Label`).setText(``)

          this.emailNode.active = this.accountType == WidAccountType.WID_TYPE_PAY_PAL;
          this.cardNode.active = this.accountType == WidAccountType.WID_TYPE_CARD;
          this.cashAppNode.active = this.accountType == WidAccountType.WID_TYPE_CASH_APP;
          this.curIsValid = false;

          // this.infoValidCallback?.(false)
          this.setDefaultAccountInfo(widChannel);
        };
        _proto.resetView = function resetView() {
          this.emailEditBox.getComponent(EditBox).string = "";
          this.cardNameEditBox.getComponent(EditBox).string = "";
          this.cardAccountEditBox.getComponent(EditBox).string = "";
          this.monthEditBox.getComponent(EditBox).string = "";
          this.yearEditBox.getComponent(EditBox).string = "";
          this.cashAppAccountEditBox.getComponent(EditBox).string = "";
          this.emailNode.getChildByPath("input/tagNode/icTick").active = false;
          this.emailNode.getChildByPath("input/tagNode/InvalidNode").active = false;
          this.emailBgWarn.active = false;
          // this.emailNode.getChildByPath(`input/tagNode/InvalidNode/Label`).setText(``)
          this.cardNode.getChildByPath("nameInput/tagNode/icTick").active = false;
          this.cardNode.getChildByPath("accountInput/tagNode/icTick").active = false;
          this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/icTick").active = false;
          this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/InvalidNode").active = false;
          this.cardnNameBgWarn.active = false;
          this.cardnAccounBgWarn.active = false;
          this.cardnMonthBgWarn.active = false;
          this.cardnYearBgWarn.active = false;
          this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/InvalidNode/Label").setText("");
          this.cashAppNode.getChildByPath("input/tagNode/icTick").active = false;
          this.cashAppNode.getChildByPath("input/tagNode/InvalidNode").active = false;
          this.cashAppAccountBgWarn.active = false;
          // this.infoValidCallback?.(false)
        };

        _proto.setDefaultAccountInfo = function setDefaultAccountInfo(widChannel) {
          this.resetView();
          var accountInfo = new WidAccountInfo();
          var accountInfoJson = NGame.storage.get(widChannel.pbfixAccountType + "_" + widChannel.pbfixChannelId);
          var setHisData = false;
          if (accountInfoJson && accountInfoJson.length > 0) {
            accountInfo = JSON.parse(accountInfoJson);
            setHisData = true;
          }
          if (setHisData) {
            if (this.accountType == WidAccountType.WID_TYPE_PAY_PAL && accountInfo.email.length > 0) {
              this.emailEditBox.getComponent(EditBox).string = accountInfo.email;
              this.onEmailTextChanged();
            }
            if (this.accountType == WidAccountType.WID_TYPE_CARD && accountInfo.cardAccountName.length > 0 && accountInfo.cardAccountNum.length > 0 && accountInfo.cardMonth.length > 0 && accountInfo.cardYear.length > 0) {
              this.cardNameEditBox.getComponent(EditBox).string = accountInfo.cardAccountName;
              this.cardAccountEditBox.getComponent(EditBox).string = accountInfo.cardAccountNum;
              this.monthEditBox.getComponent(EditBox).string = accountInfo.cardMonth;
              this.yearEditBox.getComponent(EditBox).string = accountInfo.cardYear;
              this.onCardInfoTextChanged();
            }
            if (this.accountType == WidAccountType.WID_TYPE_CASH_APP && accountInfo.cashAppAccount.length > 0) {
              if (accountInfo.cashAppAccount.startsWith("$")) {
                accountInfo.cashAppAccount = accountInfo.cashAppAccount.replaceAll("$", "");
                NGame.storage.set(widChannel.pbfixAccountType + "_" + widChannel.pbfixChannelId, JSON.stringify(accountInfo));
              }
              this.cashAppAccountEditBox.getComponent(EditBox).string = accountInfo.cashAppAccount;
              // if (checkValid) {
              this.onCashAppAccountTextChanged();
              // }
            }
          }
        };

        _proto.onEmailTextChanged = function onEmailTextChanged() {
          var eMailStr = this.emailEditBox.getComponent(EditBox).string;
          var isValid = (eMailStr == null ? void 0 : eMailStr.length) > 0 && Utils.isValidEmail(eMailStr);
          this.emailNode.getChildByPath("input/tagNode/InvalidNode").active = !isValid;
          this.emailNode.getChildByPath("input/tagNode/icTick").active = isValid;
          this.emailBgWarn.active = !isValid;
          this.curIsValid = isValid;
          // this.infoValidCallback?.(isValid)
          return isValid;
        };
        _proto.onCardInfoTextChanged = function onCardInfoTextChanged() {
          var _this$cardNameEditBox, _this$cardAccountEdit;
          var nameValid = ((_this$cardNameEditBox = this.cardNameEditBox.getComponent(EditBox).string) == null ? void 0 : _this$cardNameEditBox.length) > 0;
          var accountValid = ((_this$cardAccountEdit = this.cardAccountEditBox.getComponent(EditBox).string) == null ? void 0 : _this$cardAccountEdit.length) > 0;
          var expireDateValidData = this.checkExpireDateValid();
          this.cardNode.getChildByPath("nameInput/tagNode/icTick").active = nameValid;
          this.cardNode.getChildByPath("nameInput/tagNode/InvalidNode").active = !nameValid;
          this.cardNode.getChildByPath("accountInput/tagNode/icTick").active = accountValid;
          this.cardNode.getChildByPath("accountInput/tagNode/InvalidNode").active = !accountValid;
          this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/icTick").active = expireDateValidData.isValid;
          if (!expireDateValidData.isValid && expireDateValidData.errorStr.length > 0) {
            this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/InvalidNode").active = true;
            this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/InvalidNode/Label").setText(expireDateValidData.errorStr);
          } else {
            this.cardNode.getChildByPath("expireDateInput/monthInput/tagNode/InvalidNode").active = false;
          }
          this.cardnNameBgWarn.active = !nameValid;
          this.cardnAccounBgWarn.active = !accountValid;
          this.cardnMonthBgWarn.active = !expireDateValidData.monthValid;
          this.cardnYearBgWarn.active = !expireDateValidData.yeartValid;
          this.curIsValid = nameValid && accountValid && expireDateValidData.isValid;
          // this.infoValidCallback?.(this.curIsValid)

          return {
            nameValid: nameValid,
            accountValid: accountValid,
            monthValid: expireDateValidData.monthValid,
            yeartValid: expireDateValidData.yeartValid,
            errorStr: expireDateValidData.errorStr
          };
        };
        _proto.checkExpireDateValid = function checkExpireDateValid() {
          var month = this.monthEditBox.getComponent(EditBox).string;
          var year = this.yearEditBox.getComponent(EditBox).string;
          var errorStr = "";
          var monthValid = (month == null ? void 0 : month.length) >= 2 && Utils.convertToNum(month) > 0 && Utils.convertToNum(month) <= 12;
          // if (!monthValid && month?.length > 0) {
          if (!monthValid) {
            errorStr = "Please enter the correct month and year".i18nStr();
          }
          var yeartValid = (year == null ? void 0 : year.length) >= 4 && Utils.convertToNum(year) >= new Date().getFullYear();
          // if (!yeartValid && year?.length > 0) {
          if (!yeartValid) {
            errorStr = "Please enter the correct month and year".i18nStr();
          }

          // return month?.length >= 2 && Utils.convertToNum(month) > 0 && Utils.convertToNum(month) <= 12 && year?.length >= 4;
          return {
            isValid: monthValid && yeartValid,
            monthValid: monthValid,
            yeartValid: yeartValid,
            errorStr: errorStr
          };
        };
        _proto.onCashAppAccountTextChanged = function onCashAppAccountTextChanged() {
          var account = this.cashAppAccountEditBox.getComponent(EditBox).string;
          var isValid = (account == null ? void 0 : account.length) > 0 && Utils.isValidCashtag(account);
          this.cashAppNode.getChildByPath("input/tagNode/InvalidNode").active = !isValid;
          this.cashAppNode.getChildByPath("input/tagNode/icTick").active = isValid;
          this.cashAppAccountBgWarn.active = !isValid;
          this.curIsValid = isValid;
          if (account.includes("$")) {
            this.cashAppAccountEditBox.getComponent(EditBox).string = account.replaceAll("$", "");
            this.cashAppAccountEditBox.getComponent(EditBox).setFocus();
          }
          // this.infoValidCallback?.(isValid)
          return isValid;
        };
        _proto.checkShowWarnBgAnim = function checkShowWarnBgAnim(bgWarnNode, showAnim) {
          if (showAnim) {
            tween(bgWarnNode).to(0.05, {
              scale: v3(1.05, 1.05, 1)
            }).to(0.05, {
              scale: v3(1, 1, 1)
            }).to(0.05, {
              scale: v3(1.03, 1.03, 1)
            }).to(0.05, {
              scale: v3(1, 1, 1)
            }).bindNodeState(false).start();
          }
        };
        _proto.getWithdrawInfoJson = function getWithdrawInfoJson() {
          var data;
          if (this.accountType == WidAccountType.WID_TYPE_PAY_PAL) {
            data = {
              email: this.emailEditBox.getComponent(EditBox).string
            };
          }
          if (this.accountType == WidAccountType.WID_TYPE_CARD) {
            var month = this.monthEditBox.getComponent(EditBox).string;
            var year = this.yearEditBox.getComponent(EditBox).string;
            data = {
              account_name: this.cardNameEditBox.getComponent(EditBox).string,
              account_no: this.cardAccountEditBox.getComponent(EditBox).string,
              expire_date: month + "/" + Number(year.toString().slice(-2))
            };
          }
          if (this.accountType == WidAccountType.WID_TYPE_CASH_APP) {
            var cashtag = this.cashAppAccountEditBox.getComponent(EditBox).string;
            // if (cashtag.startsWith(`$`)) {
            //     cashtag = cashtag.replaceAll(`$`, ``)
            // }
            data = {
              account_no: "$" + cashtag
            };
          }
          return data ? JSON.stringify(data) : "";
        };
        _proto.checkAccountValid = function checkAccountValid(showWarn) {
          if (showWarn === void 0) {
            showWarn = false;
          }
          var isValid = true;
          if (this.accountType == WidAccountType.WID_TYPE_PAY_PAL) {
            isValid = this.onEmailTextChanged();
            if (showWarn) {
              this.checkShowWarnBgAnim(this.emailBgWarn, !isValid);
            }
          }
          if (this.accountType == WidAccountType.WID_TYPE_CARD) {
            var validData = this.onCardInfoTextChanged();
            isValid = validData.nameValid && validData.accountValid && validData.monthValid && validData.yeartValid;
            if (showWarn) {
              this.checkShowWarnBgAnim(this.cardnNameBgWarn, !validData.nameValid);
              this.checkShowWarnBgAnim(this.cardnAccounBgWarn, !validData.accountValid);
              this.checkShowWarnBgAnim(this.cardnMonthBgWarn, !validData.monthValid);
              this.checkShowWarnBgAnim(this.cardnYearBgWarn, !validData.yeartValid);
            }
          }
          if (this.accountType == WidAccountType.WID_TYPE_CASH_APP) {
            isValid = this.onCashAppAccountTextChanged();
            if (showWarn) {
              this.checkShowWarnBgAnim(this.cashAppAccountBgWarn, !isValid);
            }
          }
          return isValid;
        };
        _proto.isCurValid = function isCurValid() {
          return this.curIsValid;
        };
        return WidAccountInfoView;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "emailNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "emailEditBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cardNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cardNameEditBox", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cardAccountEditBox", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "monthEditBox", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "yearEditBox", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cashAppNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "cashAppAccountEditBox", [_dec10], {
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

System.register("chunks:///_virtual/WidFirst.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './Utils.ts', './FirstDeposit.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, MKStaticViewBase, NGame, gameDataMgr, HttpPbFunc, isResponseValid, pbfixMoneyType, Utils, safetyNum, FirstDeposit;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixMoneyType = module.pbfixMoneyType;
    }, function (module) {
      Utils = module.Utils;
      safetyNum = module.safetyNum;
    }, function (module) {
      FirstDeposit = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "4d29a+y+aBA46+S2AH5U1PB", "WidFirst", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var WidFirst = exports('WidFirst', (_dec = ccclass('WidFirst'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(WidFirst, _MKStaticViewBase);
        function WidFirst() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          //-----------------------------------
          _initializerDefineProperty(_this, "labVip", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labMinWid", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labBalance", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labWid", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labFirstPercent", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnWid", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor7, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = WidFirst.prototype;
        //-----------------------------------
        // first_deposit_conf: any = null;
        _proto.onLoad = function onLoad() {
          // this.onClicked(this.btnWid, this.clickWid.bind(this));
          this.onClicked(this.btnDeposit, this.clickDepositFirst.bind(this));
        };
        _proto.showView = function showView() {
          var _vipInfo$pbfixSingleW,
            _userData$pbfixBalanc,
            _this2 = this,
            _safetyNum$cToFeeRate;
          var firstPayConf = gameDataMgr.payConf.pbfixFirstPayConf;
          //270%
          var userData = gameDataMgr.userInfo;
          var showVipLv = Math.max(userData.pbfixVip, 1);
          var vipInfo = gameDataMgr.hallConf.pbfixVipList.find(function (item) {
            return item.pbfixVipLevel == showVipLv;
          });

          //VIP等级
          this.labVip.setText("VIP" + showVipLv);
          //最小提现
          this.labMinWid.setText(Utils.setCurrency(vipInfo == null || (_vipInfo$pbfixSingleW = vipInfo.pbfixSingleWLimit) == null ? void 0 : _vipInfo$pbfixSingleW.cToRateNum()));
          //余额
          this.labBalance.setText(Utils.setCurrency(userData == null || (_userData$pbfixBalanc = userData.pbfixBalance) == null ? void 0 : _userData$pbfixBalanc.cToRateNum()));

          //已经提现金额
          HttpPbFunc.pbfixWithdrawDataReq(this.node, pbfixMoneyType.pbfixMONEY_TYPE_BALANCE, function (res) {
            var _totalWithdrawnAmount;
            var totalWithdrawnAmount = 0;
            if (isResponseValid(res)) {
              totalWithdrawnAmount = res.pbfixTotalWithdrawnAmount || 0;
            }
            _this2.labWid.setText(Utils.setCurrency((_totalWithdrawnAmount = totalWithdrawnAmount) == null ? void 0 : _totalWithdrawnAmount.cToRateNum()));
          });

          //270%
          this.labFirstPercent.setText(((_safetyNum$cToFeeRate = safetyNum(firstPayConf == null ? void 0 : firstPayConf.pbfixMaxGiftRate).cToFeeRateNum()) != null ? _safetyNum$cToFeeRate : 0) + "%");
        };
        _proto.clickDepositFirst = function clickDepositFirst() {
          NGame.uiManage.open(FirstDeposit);
        };
        _proto.clickWid = function clickWid() {};
        return WidFirst;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labVip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labMinWid", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labBalance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labWid", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labFirstPercent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnWid", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec8], {
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

System.register("chunks:///_virtual/WidInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameCfg.ts', './Constant.ts', './Decorators.ts', './MKStaticViewBase.ts', './NGame.ts', './GameDataMgr.ts', './HttpPbFunc.ts', './WebApiEnums.ts', './GoogleAnatytics.ts', './PayUtils.ts', './Utils.ts', './WidAccountInfoView.ts', './FirstDeposit.ts', './PayTypeItem.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, EditBox, instantiate, GameCfg, RATE_FEE, StorageKey, RATE_CURRENCY, inject, MKStaticViewBase, NGame, gameDataMgr, HttpPbFunc, isResponseValid, pbfixMoneyType, GAEvent, GoogleAnalytics, GAParamKey, PayUtils, safetyNum, Utils, WidAccountInfoView, FirstDeposit, PayTypeItem;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      EditBox = module.EditBox;
      instantiate = module.instantiate;
    }, function (module) {
      GameCfg = module.default;
    }, function (module) {
      RATE_FEE = module.RATE_FEE;
      StorageKey = module.StorageKey;
      RATE_CURRENCY = module.RATE_CURRENCY;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      MKStaticViewBase = module.MKStaticViewBase;
    }, function (module) {
      NGame = module.NGame;
    }, function (module) {
      gameDataMgr = module.default;
    }, function (module) {
      HttpPbFunc = module.HttpPbFunc;
      isResponseValid = module.isResponseValid;
    }, function (module) {
      pbfixMoneyType = module.pbfixMoneyType;
    }, function (module) {
      GAEvent = module.GAEvent;
      GoogleAnalytics = module.GoogleAnalytics;
      GAParamKey = module.GAParamKey;
    }, function (module) {
      PayUtils = module.PayUtils;
    }, function (module) {
      safetyNum = module.safetyNum;
      Utils = module.Utils;
    }, function (module) {
      WidAccountInfoView = module.WidAccountInfoView;
    }, function (module) {
      FirstDeposit = module.default;
    }, function (module) {
      PayTypeItem = module.PayTypeItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;
      cclegacy._RF.push({}, "59464/e8PJBVYKA/bubH21g", "WidInfo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * cash提现页面
       */
      var WidInfo = exports('WidInfo', (_dec = ccclass('WidInfo'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: Node
      }), _dec11 = property({
        tooltip: '',
        type: Node
      }), _dec12 = property({
        tooltip: '',
        type: Node
      }), _dec13 = property({
        tooltip: '',
        type: Node
      }), _dec14 = inject("bg/WidAccountInfoView", Node), _dec15 = inject("bg/top/widItemParent", Node), _dec16 = inject("PayTypeItem", Node), _dec(_class = (_class2 = /*#__PURE__*/function (_MKStaticViewBase) {
        _inheritsLoose(WidInfo, _MKStaticViewBase);
        function WidInfo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKStaticViewBase.call.apply(_MKStaticViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labAvailable", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labMax", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "editBoxAmount", _descriptor3, _assertThisInitialized(_this));
          // @property({ type: Node })
          // btnListParent: Node = null;
          //-----------------------------------USDT-- 线上钱包1
          _initializerDefineProperty(_this, "USDTInfo", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labProtocol", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "editBoxWalletAddress", _descriptor6, _assertThisInitialized(_this));
          //-----------------------------------
          _initializerDefineProperty(_this, "labNeedBet", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labFee", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labReceive", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnWid", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "btnDeposit", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goToDeposit", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widAccountInfoView", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "widItemParent", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PayTypeItem", _descriptor15, _assertThisInitialized(_this));
          _this.widIdx = 0;
          _this.channelIdx = 0;
          _this.widNum = 0;
          _this.fee = 0.05;
          _this.showDepositCall = null;
          _this.vipInfo = void 0;
          _this.availableAmount = 0;
          _this.isReqWidIng = false;
          return _this;
        }
        var _proto = WidInfo.prototype;
        _proto.onLoad = function onLoad() {
          this.onClicked(this.btnWid, this.clickWid.bind(this));
          this.onClicked(this.btnDeposit, this.clickDepositFirst.bind(this));
          var data = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
          if (data) {
            this.editBoxAmount.getComponent(EditBox).string = safetyNum(data.pbfixMinWithdraw).cToRateNum().toString();
          }
          this.editBoxAmount.on('text-changed', this.onTextChanged.bind(this, this.editBoxAmount.getComponent(EditBox)), this);
          // this.editBoxEmail.on('text-changed', this.onEditBegan, this);
          this.editBoxWalletAddress.on('text-changed', this.onEditBegan, this);
          this.editBoxAmount.on('editing-did-began', this.onEditBegan, this);
          // this.editBoxEmail.on('editing-did-began', this.onEditBegan, this);
          this.editBoxWalletAddress.on('editing-did-began', this.onEditBegan, this);

          // this.widAccountInfoView.getComponent(WidAccountInfoView).setInfoValidCallback((isValid: boolean) => {
          //     this.btnWid.getComponent(Button).interactable = isValid;
          // })
        };

        _proto.showView = function showView(showDepositCall) {
          var _this2 = this,
            _this$vipInfo,
            _this$vipInfo2,
            _this$userInfo;
          if (showDepositCall) {
            this.showDepositCall = showDepositCall;
          }
          // this.first_deposit_conf = UserDate.getInstance().gameConfig.deposit_conf.first_deposit_conf;
          this.vipInfo = gameDataMgr.hallConf.pbfixVipList.find(function (item) {
            return item.pbfixVipLevel == _this2.userInfo.pbfixVip;
          });
          this.fee = safetyNum((_this$vipInfo = this.vipInfo) == null ? void 0 : _this$vipInfo.pbfixWFeeRate).cToFeeRateNum();

          //可提现金额
          HttpPbFunc.pbfixWithdrawDataReq(this.node, pbfixMoneyType.pbfixMONEY_TYPE_BALANCE, function (res) {
            var _this2$availableAmoun;
            _this2.availableAmount = 0;
            if (isResponseValid(res)) {
              _this2.availableAmount = res.pbfixAvailableAmount || 0;
            }
            _this2.labAvailable.setText(Utils.setCurrency((_this2$availableAmoun = _this2.availableAmount) == null ? void 0 : _this2$availableAmoun.cToRateNum()));
          });

          //最大提现
          this.labMax.setText(Utils.setCurrency((_this$vipInfo2 = this.vipInfo) == null || (_this$vipInfo2 = _this$vipInfo2.pbfixDailyWLimit) == null ? void 0 : _this$vipInfo2.cToRateNum()));

          //提现按钮
          this.setWidTypeBtns();
          // this.updateWidTypeInfo();

          //还需下注
          this.labNeedBet.setText(safetyNum((_this$userInfo = this.userInfo) == null ? void 0 : _this$userInfo.pbfixRemainValueBalance).cToRateNum());
          //费用
          this.labFee.setText(this.fee + "% " + GameCfg.currency_abbreviation);
          //收到
          this.updateReceive();

          //充值按钮
          // let firstDepositUserInfo = UserDate.getInstance().firstDepositUserInfo;
          // if (firstDepositUserInfo.order_type == 3 && firstDepositUserInfo.day_num > 6) {//三级复充过期
          this.goToDeposit.active = false;
          // }
          // else {
          // this.goToDeposit.active = true;
          // }

          var data = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
          this.widAccountInfoView.getComponent(WidAccountInfoView).showView(data);
        };
        _proto.setWidTypeBtns = function setWidTypeBtns() {
          var _this3 = this;
          this.widIdx = 0;
          this.channelIdx = 0;
          var len = this.withdrawTypeList.length;
          this.widItemParent.removeAllChildren();
          for (var i = 0; i < len; i++) {
            var item = instantiate(this.PayTypeItem);
            item.active = true;
            item.getComponent(PayTypeItem).setData(this.createTypeData(this.withdrawTypeList[i]), i, function (typeIdx) {
              if (typeIdx != _this3.widIdx) {
                _this3.widIdx = typeIdx;
                _this3.channelIdx = 0;
                _this3.widItemParent.children.forEach(function (widItem, itemIdx) {
                  if (itemIdx == _this3.widIdx) {
                    widItem.getComponent(PayTypeItem).onSelected(_this3.channelIdx);
                  } else {
                    widItem.getComponent(PayTypeItem).onNoSelect();
                  }
                });
                _this3.updateWidTypeInfo();
                // NGame.tips.toast(`widIdx = ${this.widIdx}, channelIdx = ${this.channelIdx}`)
              }
            }, function (channelIdx) {
              _this3.channelIdx = channelIdx;
              var info = _this3.withdrawTypeList[_this3.widIdx].pbfixChannelList[_this3.channelIdx];
              _this3.widAccountInfoView.getComponent(WidAccountInfoView).setDefaultAccountInfo(info);
              // NGame.tips.toast(`widIdx = ${this.widIdx}, channelIdx = ${this.channelIdx}`)
            });

            this.widItemParent.addChild(item);
          }
          this.widItemParent.children[this.widIdx].getComponent(PayTypeItem).onSelected(this.channelIdx);
        };
        _proto.updateWidTypeInfo = function updateWidTypeInfo() {
          // for (let i = 0; i < this.btnListParent.children.length; i++) {
          //     let btnNode = this.btnListParent.children[i];
          //     btnNode.child("sel").active = i == this.widIdx;
          // }

          //根据是否是数字钱包 显示不同内容
          var data = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
          // this.cashAppInfo.active = !data.pbfixIsWallet;
          this.USDTInfo.active = data.pbfixIsWallet;
          if (!data.pbfixIsWallet) ;
          this.widAccountInfoView.getComponent(WidAccountInfoView).showView(data);
          // this.widAccountInfoView.getComponent(WidAccountInfoView).showView(safetyNum(data.pbfixAccountType))
          // this.widAccountInfoView.getComponent(WidAccountInfoView).showView(this.widIdx + 1)
        };

        _proto.updateReceive = function updateReceive() {
          var num = this.widNum - this.widNum * (this.fee / RATE_FEE);
          this.labReceive.setText(Utils.setCurrencyAbbreviation(num));
        };
        _proto.onTextChanged = function onTextChanged(editbox) {
          var data = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
          if (data) {
            var amout = 0;
            if (editbox.string == '') {
              amout = 0;
            }
            amout = Number(editbox.string);
            if (amout < safetyNum(data == null ? void 0 : data.pbfixMinWithdraw).cToRateNum()) {
              amout = safetyNum(data == null ? void 0 : data.pbfixMinWithdraw).cToRateNum();
              editbox.string = amout.toString();
            }
            this.widNum = amout;
            this.updateReceive();
          }
        };
        _proto.onEditBegan = function onEditBegan(editbox) {
          // const eMailStr = this.editBoxEmail.getComponent(EditBox).string
          // this.btnWid.getComponent(Button).interactable = eMailStr.length > 0 && Utils.isValidEmail(eMailStr)
        }

        // showEditBoxRedKuang() {
        //     let arr = [this.editBoxAmount, this.editBoxEmail, this.editBoxWalletAddress];
        //     arr.forEach((editBox, index) => {
        //         if (editBox.getComponent(EditBox).string == "") {
        //             editBox.child("red") && (editBox.child("red").active = true);
        //         }
        //     })
        // }

        /**
         * 点击提现
         * @returns 
         */;
        _proto.clickWid = function clickWid() {
          var _gameDataMgr$hallConf,
            _this4 = this;
          // const json = this.widAccountInfoView.getComponent(WidAccountInfoView).getWithdrawInfoJson();
          // `json = ${json}`.logI(`ioasoifnn9as921465234`)
          var withdrawData = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
          if (!this.widAccountInfoView.getComponent(WidAccountInfoView).checkAccountValid(true)) {
            this.reportWithdrawInfo(GAEvent.CLICK_WITHDRAWAL_INVALID_CASH, this.widAccountInfoView);
            return;
          }
          if (this.isReqWidIng) {
            return;
          }
          GoogleAnalytics.track(GAEvent.CLICK_WITHDRAWAL_CASH);
          this.reportWithdrawInfo(GAEvent.WITHDRAWAL_INFO_CASH, this.widAccountInfoView);
          var accountInfo = this.widAccountInfoView.getComponent(WidAccountInfoView).getAccountInfo();
          // `accountInfo = ${JSON.stringify(accountInfo)}`.logI(`u9a9sufb29`)
          NGame.storage.set(withdrawData.pbfixAccountType + "_" + withdrawData.pbfixChannelId, JSON.stringify(accountInfo));
          NGame.storage.set(StorageKey.CASH_WITHDRWA_INFO_VAILD, true);
          //cashapp ,trc20
          var walletAddress = "";
          var amount = this.widNum;
          // let email = "";
          // const withdrawTypeId = withdrawData.pbfixTypeId;
          var curAvailableAmount = safetyNum(this.availableAmount).cToRateNum();

          //需要填写的内容是否为空
          var isEmptyInfo = this.widNum == 0;
          if (withdrawData.pbfixIsWallet) {
            walletAddress = this.editBoxWalletAddress.getComponent(EditBox).string;
            if (walletAddress == "") {
              isEmptyInfo = true;
            }
          }
          // else {
          //     email = this.editBoxEmail.getComponent(EditBox).string
          //     if (!Utils.isValidEmail(email)) {
          //         NGame.tips.toast("Email_Ivalid".i18nStr())
          //         return;
          //     }
          // }

          //最小提现金额
          var min_withdraw_money = safetyNum((_gameDataMgr$hallConf = gameDataMgr.hallConf) == null ? void 0 : _gameDataMgr$hallConf.pbfixWMinAmount).cToRateNum();
          ("isEmptyInfo = " + isEmptyInfo + ", amount = " + amount + ", min_withdraw_money = " + min_withdraw_money + ", availableAmount = " + this.availableAmount + ", remainValueBalance = " + this.userInfo.pbfixRemainValueBalance).logI("noia893917rh0");
          // 数据不全, 小于最小金额，可提现金额不足，剩余码数大于0
          if (isEmptyInfo || amount < min_withdraw_money || curAvailableAmount < amount || this.userInfo.pbfixRemainValueBalance > 0) {
            if (this.userInfo.pbfixRemainValueBalance > 0) {
              var _this$userInfo2;
              //“还有剩余打码量”
              NGame.tips.toast("Still need to bet".i18nStr() + ("" + ((_this$userInfo2 = this.userInfo) == null ? void 0 : _this$userInfo2.pbfixRemainValueBalance.cToRateNum())));
              return;
            }

            //“提现金额不足”
            NGame.tips.toast("The withdrawal amount is insufficient".i18nStr());
            return;
          }
          this.isReqWidIng = true;
          HttpPbFunc.pbfixWithdrawReq(this.node, pbfixMoneyType.pbfixMONEY_TYPE_BALANCE, amount * RATE_CURRENCY, withdrawData.pbfixTypeId, withdrawData.pbfixChannelId, this.widAccountInfoView.getComponent(WidAccountInfoView).getWithdrawInfoJson(), walletAddress, function (result) {
            _this4.isReqWidIng = false;
          });
        }

        /**
         * 点击充值按钮
         * @returns 
         */;
        _proto.clickDepositFirst = function clickDepositFirst() {
          GoogleAnalytics.track(GAEvent.CLICK_DEPOSIT_WITHDRAWAL_PAGE);
          if (PayUtils.isFirstPayActBuyed) {
            var _this$showDepositCall;
            (_this$showDepositCall = this.showDepositCall) == null || _this$showDepositCall.call(this);
          } else {
            NGame.uiManage.open(FirstDeposit);
          }
        };
        _proto.createTypeData = function createTypeData(data) {
          return {
            typeName: data.pbfixName,
            typeIconUrl: data.pbfixIconUrl,
            channels: data.pbfixChannelList.map(function (channel) {
              return channel.pbfixName;
            })
          };
        }

        /**
         * 提现数据上报
         * @param eventName 事件名
         * @param accountInfoView 账户信息视图
         */;
        _proto.reportWithdrawInfo = function reportWithdrawInfo(eventName, accountInfoView) {
          try {
            var _reportData;
            // 数据上报
            var info = this.withdrawTypeList[this.widIdx].pbfixChannelList[this.channelIdx];
            var wInfoJson = accountInfoView.getComponent(WidAccountInfoView).getWithdrawInfoJson();
            var walletAddress = this.editBoxWalletAddress.getComponent(EditBox).string || "";
            var wInfo = {};
            try {
              wInfo = wInfoJson ? JSON.parse(wInfoJson) || {} : {};
            } catch (error) {}

            // 不重要的数据都放jsonData
            var jsonData = {
              "typeId": info.pbfixTypeId,
              "channelId": info.pbfixChannelId,
              "walletAddress": walletAddress
            };
            var reportData = (_reportData = {}, _reportData[GAParamKey.value] = this.widNum || 0, _reportData["jsonData"] = JSON.stringify(jsonData), _reportData);
            // if (wInfo.email) {
            //     reportData[GAParamKey.m_email] = wInfo.email
            // }
            if (wInfo.account_name) {
              reportData[GAParamKey.account] = wInfo.account_name;
            }
            if (wInfo.account_no) {
              reportData[GAParamKey.serial_number] = wInfo.account_no;
            }
            if (wInfo.expire_date) {
              reportData[GAParamKey.m_date] = wInfo.expire_date;
            }
            reportData[GAParamKey.jsonData] = JSON.stringify(jsonData);
            GoogleAnalytics.track(eventName, reportData);
          } catch (error) {}
        };
        _createClass(WidInfo, [{
          key: "userInfo",
          get: function get() {
            return gameDataMgr.userInfo;
          }
        }, {
          key: "withdrawTypeList",
          get: function get() {
            return gameDataMgr.withdrawTypeList;
          }
        }]);
        return WidInfo;
      }(MKStaticViewBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labAvailable", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labMax", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editBoxAmount", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "USDTInfo", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labProtocol", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "editBoxWalletAddress", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "labNeedBet", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "labFee", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "labReceive", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "btnWid", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "btnDeposit", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "goToDeposit", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "widAccountInfoView", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "widItemParent", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "PayTypeItem", [_dec16], {
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
  r('virtual:///prerequisite-imports/hall', 'chunks:///_virtual/hall'); 
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