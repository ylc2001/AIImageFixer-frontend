<template>
  <div class="main-footer">
    <div class="copyright">COPYRIGHT ©&nbsp;&nbsp;BugMakers&nbsp;&nbsp;ALL RIGHTS RESERVED
    </div>
    <img class="logo" src="@/assets/logo_dark.png">
  </div>
</template>

<style scoped>
  .main-footer {
    position: relative;
    bottom: 0px;
    overflow: hidden;
    height: 180px;
    width: 100%;
    background: #ffffff;
    color: #409eff;
    text-align: center;
    font-family: "微软雅黑";
    line-height: 20px;
    font-size: 14px;
    letter-spacing: 2.25px;
  }

  .num {
    width: 20px;
    height: 32px;
    background-color: rgba(64,158,255,0.1);
    z-index: 9999;
    color: #409eff;
    font-size: 14px;
    line-height: 32px;
    padding-left: 3px;
    float: left;
  }

  .menu {
    letter-spacing: 0;
  }

  .menu a {
    margin: 0 0.5rem;
    color: #409eff;
    text-decoration: none;
  }

  .copyright {
    letter-spacing: 0;
    font-family: "微软雅黑";
    margin-top: 2%;
  }

  .logo {
    width: 15%;
  }
</style>