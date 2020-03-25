module.exports = {

    /**
     * 站点名称，用于logo文本及浏览器标签title
     */
    siteName: '移动',

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings: false,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in header
     */
    logo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'development',

    /**
     * 配置主键,目前用于存储
     */
    key: 'library',
    /**
     * 客户端id
     */
    clientId: 'datacenter',
    /**
     * 客户端密钥
     */
    clientSecret: 'datacenter_secret',
    /**
     * 是否开启租户模式
     */
    tenantMode: true,
    /**
     * Token有效期
     */
    tokenTime: 3000,
    /**
     * 租户ID
     */
    tenantId: '000000',
    /**
     * OAuth2鉴权类型
     */
    grant_type: "password",
    /**
    * OAuth2授权范围
    */
    scope: "all",
    /**
     * 用户登录类型：用户名登录
     */
    type: "account"

}
