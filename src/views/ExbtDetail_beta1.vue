<template>
  <div class="main-body">
    <div class="title-intro">
      <div class="title">
        title
      </div>
      <div class="intro">
        intro
      </div>
    </div>
    <section v-for="item in pics" :key="item.id">
      <div class="box">
        <h2 data-jarallax-element="0 200">{{item.title}}</h2>
        <div class="container">
          <div class="imgBx jarallax">
            <img
              class="jarallax-img"
              :src="item.pic"
            />
          </div>
          <div class="content" data-jarallax-element="-200 0">
            <div class="pic-intro">
              {{item.intro}}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {jarallax} from 'jarallax';
import {request_json} from "@/utils/communication";
import API from "@/utils/API";
import "@/assets/iconfont/iconfont.css"
import CookieOperation from "@/utils/tools";
export default {
  components: {
  },
  mounted() {
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.6
    });
    this.exhibition.id = CookieOperation.getCookie("exhibit", "");
    // this.getExhibitionData(this.exhibition.id);
  },
  data() {
    return {
      exhibition: {
        id: this.$route.params.id || 1,
        title: "",
        intro: "",
        tags: [], //toadd
        isOpen: true, //0未公开，1已公开
        style: 0,
        likesNum: 0,
        collection: false,
        collectionNum: 0,
        pic: [], //传输图片？
        like: false, //是否对该展览点过赞
        collect: false,
        likes: [], //是否对展览中的每一张图片点过赞
        comments: [],
      },
      state: {
        isAdmin: true,
      },
      exbtEditor: {
        dialogVisible: false,
      },
      tagsOperation: {
        inputVisible: false,
        inputValue: '',
      },
      isEditingPics: false,
      pics: [
        {
          id: 1,
          like: true,
          collect: false,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 1",
          intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, laborum molestiae distinctio sunt unde aliquam id veniam dolor magnam amet facere sapiente quaerat ex. Voluptas eveniet tenetur doloribus eum quam!春江潮水连海平，海上明月共潮生。春潮带雨晚来急，野渡无人舟自横",
        },
        {
          id: 2,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.yczihua.com%2Fimages%2F201404%2Fgoods_img%2F1687_P_1397183564694.jpg&refer=http%3A%2F%2Fstatic.yczihua.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652940491&t=7022bb530c6252ae2e088c0854a6943c",
          title: "标题文本 2",
          intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, laborum molestiae distinctio sunt unde aliquam id veniam dolor magnam amet facere sapiente quaerat ex. Voluptas eveniet tenetur doloribus eum quam!春江潮水连海平，海上明月共潮生。春潮带雨晚来急，野渡无人舟自横",
        },
        {
          id: 3,
          pic: "https://img2.baidu.com/it/u=2135935567,2316618521&fm=253&fmt=auto&app=138&f=JPEG?w=359&h=500",
          title: "Title 3",
          intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, laborum molestiae distinctio sunt unde aliquam id veniam dolor magnam amet facere sapiente quaerat ex. Voluptas eveniet tenetur doloribus eum quam!春江潮水连海平，海上明月共潮生。春潮带雨晚来急，野渡无人舟自横",
        },
        {
          id: 4,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 4",
          intro: "introduction",
        },
        {
          id: 5,
          pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9295283681%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650596938&t=3cab587573c10c30d663f442b413506a",
          title: "Unknown",
          intro: "introduction",
        },
        {
          id: 6,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 6",
          intro: "introduction",
        },
        {
          id: 7,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 7",
          intro: "introduction",
        },
        {
          id: 8,
          pic: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "Title 8",
          intro: "introduction",
        },
      ], //for test
      tmpPics: [], //编辑图片列表时暂时复制一个
      picnumPerRow: 4,
      key: {
        exbtEditorKey: 0,
      },
      selectPics: {
        dialogVisible: false,
      },
      search_info: {
        tagOptions: [{
          value: '选项1',
          label: '人文'
        }, {
          value: '选项2',
          label: '风景'
        }, {
          value: '选项3',
          label: '日常'
        }, {
          value: '选项4',
          label: '建筑'
        }, {
          value: '选项5',
          label: '校园',
        }, {
          value: '选项6',
          label: '社会',
        }, {
          value: '选项7',
          label: '人物',
        }],
        tagSelected: [],
        title: "",
        public: 1,
        repair_status: 2,
        time: [],
        order_type: 1,
        order: 0,
      },
    };
  },
  methods: {
    getExhibitionData(id) {
      request_json(API.exhibit_search.path, API.exhibit_search.method, {
        id: id,
        comments: 1,
      }).then((response)=>{
        if(response.code == 400) {
          console.log("error getting exhibition detail", id);
        }
        else {
          console.log("getechi", response.data);
          this.exhibition.title = response.data.title;
          this.exhibition.intro = response.data.intro;
          this.exhibition.tags = response.data.tags;
          this.exhibition.likesNum = response.data.likesNum;
          // this.pics = [].concat(response.data.pic);
          // this.exhibition.likes = [].concat(response.data.likes);
          this.exhibition.comments = [].concat(response.data.comments);
          this.exhibition.collectionNum = response.data.collectionNum;
          if(response.data.public == 1) {
            this.exhibition.isOpen = true;
          } else {
            this.exhibition.isOpen = false;
          }
          if(response.data.like == 1) {
            this.exhibition.like = true;
          } else {
            this.exhibition.like = false;
          }
          if(response.data.collection == 1) {
            this.exhibition.collection = true;
          } else {
            this.exhibition.collection = false;
          }
          console.log("isOpen", this.exhibition.isOpen);
          this.key.exbtEditorKey++;

        }
      });
      request_json(API.pictures_search.path, API.pictures_search.method, {
        exhibit_id: this.exhibition.id,
        public: 1,
        repair_status: 2,
      }).then((response)=>{
        console.log("pic response");
        this.pics = [].concat(response.data.pictures);
      });
    },
  }
};
</script>

<style scoped>
.title-intro {
  position: relative;
  width: 80%;
  margin: auto;
  
}
.title {
  width: 100%;
  color: white;
  font-family: 华文中宋;
  font-size: 90px;
}
.intro {
  width: 100%;
  color: white;
  font-family: 华文中宋;
  font-size: 25px;
}
.main-body {
  padding-bottom: 50px;
  overflow-x: hidden;
  background-color: rgb(24, 24, 24);
}

.main-body:before {
  content: 'FAixer';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16em;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 10px #555;
}

section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

section h2 {
  margin-left: 200px;
  font-size: 4em;
  font-family: 华文中宋;
  color: #fff;
  margin-bottom: 20px;
}

section .container {
  position: relative;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section:nth-child(even) .container {
  flex-direction: row-reverse;
}

section .container .imgBx {
  position: relative;
  width: 800px;
  height: 600px;
  overflow: hidden;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
}

section .container .imgBx img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
}

section .container .content {
  position: absolute;
  right: 0;
  margin-top: 200px;
  margin-bottom: 40px;
  padding: 40px;
  background: #333;
  z-index: 1;
  max-width: 400px;
  color: #fff;
  box-shadow: 0 0 20px rgba(237, 237, 239, 0.5);
  border-radius: 15px;
}

section:nth-child(even) .container .content {
  left: 0;
}
</style>
