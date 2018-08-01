<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <el-form status-icon :model="orderInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 自己新增的表单元素 element-ui中的 -->
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="收货地址" prop="address">
                                    <el-input v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                            <input name="payment_price" type="hidden" value="0.00">在线支付
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                            <input name="express_price" type="hidden" value="20.00">顺丰快递
                                            <em>费用：20.00元</em>
                                            <span class="Validform_checktip"></span>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr>
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200046589514.jpg" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                            <td align="center">1</td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">0.00</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">2299.00</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  data: function() {
    // 自定义的验证规则
    // value 输入的值
    // rule 规则
    // callback 回调
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 定义正则规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        // 定义正则规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };

    return {
      orderInfo: {
        accept_name: "常威",
        address: "甲岸桥底4号下水道5号床铺下铺",
        mobile: 18888888888
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
          { min: 2, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "change" },
          { min: 2, message: "请输入的详细一些哦", trigger: "change" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }]
      }
    };
  }
};
</script>
<style scoped>
</style>


