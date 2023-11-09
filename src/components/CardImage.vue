<template>
  <div class="card">
    <div class="imgBx">
      <img @click="toImage(id)" :src="pic" alt="" />
    </div>
    <div class="content">
      <h2>{{ title }}</h2>
      <p style="font-size: 15px">{{ intro | ellipsis}}</p>
      <div class="content_tags">
        <el-tag
          v-for="tag in this.tags"
          :key="tag"
          :type="'info'"
          effect="dark"
          style="margin: 2px; font-size: 15px"
        >
          {{ tag }}
        </el-tag>
      </div>
      <div class="date">{{ datetime }}</div>
    </div>
  </div>
</template>

<script>
import CookieOperation from "@/utils/tools";

export default {
  name: "CardImage",
  filters: {
    // 判断超出50个字显示省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 50) {
        return value.slice(0, 50) + "...";
      }
      return value;
    },
  },

  props: {
    id: {
      type: Number,
      default: 0,
    },
    pic: {
      type: String,
      default:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    },
    title: {
      type: String,
      default: "Unknown Title",
    },
    intro: {
      type: String,
      default:
        "[Unknown Intro text] voluptatibus magnam a numquam. Temporibus esse sit provident quaerat quae.",
    },
    tags: {
      type: Array,
      default: () => ["Unknown", "Tags"],
    },
    timestamp: {
      type: Number,
      default: 1649837082,
    },
    user_logged: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      default: "",
    },
    user_identity: {
      type: Number,
      default: 0,
    },
    user_avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    datetime() {
      let d = new Date();
      let tmp = this.timestamp;
      console.log("timestamp", this.timestamp);
      if (tmp < 10000000000) {
        console.log("OK");
        tmp = tmp * 1000;
      }
      //console.log("tmp111", tmp);
      d.setTime(tmp);
      return d.toLocaleString();
    },
  },
  methods: {
    toImage(val) {
      CookieOperation.setCookie("image", val, 10e9);
      window.location.href = "/user_picture_page";
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: 华文中宋;
}

/* 下面是响应式卡片的相关css, 有魔法, 勿动. */
.card {
  position: relative;
  top: 30px;
  width: 21.5vw;
  height: 14.5vw;
  background: #fff;
  margin: 30px 0px;
  /* padding: 20px 15px; */
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.6);
  transition: 0.3s ease-in-out;
  background-color: rgb(188, 194, 201);
}

.card:hover {
  height: calc(18vw + 150px);
}

.card .imgBx {
  position: relative;
  width: 20vw;
  top: -60px;
  left: 0.75vw;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.card .imgBx img {
  width: 20vw;
  height: 15vw;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}

.card .content {
  position: relative;
  margin-top: -140px;
  margin-bottom: 0%;
  padding: 10px 30px;
  text-align: left;
  color: #111;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
  /* border: #16384c 2px solid; */
}

.card:hover .content {
  visibility: visible;
  opacity: 1;
  margin-top: -40px;
  transition-delay: 0.2s;
}

.dynamic_cards {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #16384c;
}

.date {
  font-family: Consolas;
  font-size: 20px;
  text-align: right;
  color: gray;
  height: fit-content;
  margin-top: 4px;
  margin-right: 0px;
  /* border: #16384c 2px solid; */
}
</style>
