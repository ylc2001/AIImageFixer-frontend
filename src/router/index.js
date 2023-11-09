import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import UserView from '@/views/UserView.vue'
import AllExhibsView from '@/views/AllExhibsView.vue'
import AllImagesView from '@/views/AllImagesView.vue'
import MainSearchView from '@/views/MainSearchView.vue'
import AdminPage from "@/views/AdminPage.vue"
import TestView from "@/views/TestView.vue"
import ExbtDetail from "@/views/ExbtAdmin_beta.vue"
import ImgFixingDetail from "@/views/ImgFixingDetail_beta.vue"
import UserExbtDetail from "@/views/UserExbtDetail_final.vue"
import UserPicDetail from "@/views/UserImgDetail.vue"
import userCenter from "@/components/user/userCenter.vue"
import manageCenter from "@/components/user/manageCenter.vue"
import ThreeExhibitView from "@/views/ThreeExhibitView.vue"
import ExhibitionOverview from "@/components/admin_page/ExhibitionOverview";
import UserManagement from "@/components/admin_page/UserManagement";
import FixOverview from "@/components/admin_page/FixOverview";
import RecycleBin from "@/components/admin_page/RecycleBin";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexView
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
    children: [{
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },{
      path: '/manageCenter',
      name: 'manageCenter',
      component: manageCenter
    },{
      path: '/exhibitionOverview',
      name: 'ExhibitionOverview',
      component: ExhibitionOverview
    },{
      path: '/userManagement',
      name: 'UserManagement',
      component: UserManagement
    },{
      path: '/fixOverview',
      name: 'FixOverview',
      component: FixOverview
    },{
      path: '/recycleBin',
      name: 'RecycleBin',
      component: RecycleBin
    }]
  },
  {
    path: '/all_exhibs',
    name: 'all_exhibs',
    component: AllExhibsView
  },

  {
    path: '/all_images',
    name: 'all_images',
    component: AllImagesView
  },

  {
    path: '/main_search',
    name: 'main_search',
    component: MainSearchView
  },
  {
    path: '/admin_page',
    name: 'AdminPage',
    component: AdminPage,
  },
  {
    path: '/exhibition_page',
    name: 'Admin_exhibition',
    component: ExbtDetail,
  },
  {
    path: '/img_fixing_page',
    name: 'Admin_img_fixing',
    component: ImgFixingDetail,
  },
  {
    path: '/user_exhibition_page',
    component: UserExbtDetail,
  },
  {
    path: '/user_picture_page',
    component: UserPicDetail,
  },
  {
    path: '/3d_exhibit',
    component: ThreeExhibitView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router