<template>
  <div id="blocker">
    <div id="instructions">
      <b-button @click="beginTour" class="button" style="margin-top: 17%"
        >游览展览</b-button
      >
    </div>
    <div id="instructions">
      <b-button @click="goBack" class="button" style="margin-top: 1%"
        >返回详情</b-button
      >
      <span style="color: #ffffff; margin-top: 10%">
        移动: WASD ↑↓←→<br />
        跳跃: 空格<br />
        转动: 鼠标移动<br />
        暂停: ESC/Alt
      </span>
    </div>
  </div>
</template>

<script>
// import * as THREE from "@/utils/three/three.module.js";
import * as THREE from "three";
import { PointerLockControls } from "@/utils/PointerLockControls.js";
import { request_json } from "@/utils/communication.js";
import API from "@/utils/API";
import CookieOperation from "@/utils/tools";
import { background, wall, floor } from "@/utils/style_source";
import { FontLoader } from "@/utils/three/FontLoader.js";
import { TextGeometry } from "@/utils/three/TextGeometry.js";

export default {
  name: "ThreeTest",

  data() {
    return {
      pic_dis: 0,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [],
      raycaster: null,
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      canJump: true,
      prevTime: null,
      velocity: null,
      direction: null,
      vertex: null,
      color: null,
      pics: [],
      id: null,
      camera_restrict: {
        x: {
          min: null,
          max: null,
        },
        z: {
          min: null,
          max: null,
        },
      },
      style: "1",
      back_url: "",
      font: null,
      font_en: null,
      exhibit: { title: "", intro: "" },
      results: [],
    };
  },
  mounted() {
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.vertex = new THREE.Vector3();
    this.color = new THREE.Color();
    this.id = CookieOperation.getCookie("exhibit", "");
    var tmp = CookieOperation.getCookie("back", "");
    if (tmp == 1) this.back_url = "/exhibition_page";
    else this.back_url = "/user_exhibition_page";
    if (CookieOperation.getCookie("style", "") != "")
      this.style = CookieOperation.getCookie("style", "");

    request_json(API.exhibit_search.path, API.exhibit_search.method, {
      id: this.id,
      comments: 0,
    }).then((tmp) => {
      if (tmp.code >= 400) this.$message.error(tmp.data);
      if (tmp.code == 200) this.exhibit = tmp.data;
    });

    request_json(API.pictures_search.path, API.pictures_search.method, {
      exhibit_id: this.id,
      public: 1,
      repair_status: 2,
    }).then((response) => {
      if (response.code == 400) {
        console.log("error getting exhibition detail");
      } else {
        console.log(response.data);
        this.pics = response.data.pictures;
        console.log(this.pics);
        this.init_camera_and_control();
        this.init();
        this.animate();
      }
    });
  },
  methods: {
    goBack() {
      window.location.href = this.back_url;
    },

    beginTour() {
      this.controls.lock();
    },

    init_camera_and_control() {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.y = 30;
      this.camera.position.x = 70;
      this.camera.position.z = 0;
      this.camera.lookAt(new THREE.Vector3(0, 30, 0));

      this.controls = new PointerLockControls(this.camera, document.body);

      const blocker = document.getElementById("blocker");
      const instructions = document.getElementById("instructions");

      this.controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
      });

      this.controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
      });

      const onKeyDown = (event) => {
        switch (event.code) {
          case "ArrowUp":
          case "KeyW":
            this.moveForward = true;
            break;

          case "ArrowLeft":
          case "KeyA":
            this.moveLeft = true;
            break;

          case "ArrowDown":
          case "KeyS":
            this.moveBackward = true;
            break;

          case "ArrowRight":
          case "KeyD":
            this.moveRight = true;
            break;

          case "Space":
            if (this.canJump === true) this.velocity.y += 350;
            this.canJump = false;
            break;
        }
      };

      const onKeyUp = (event) => {
        switch (event.code) {
          case "ArrowUp":
          case "KeyW":
            this.moveForward = false;
            break;

          case "ArrowLeft":
          case "KeyA":
            this.moveLeft = false;
            break;

          case "ArrowDown":
          case "KeyS":
            this.moveBackward = false;
            break;

          case "ArrowRight":
          case "KeyD":
            this.moveRight = false;
            break;
        }
      };

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);
    },

    add_background() {
      var index;
      if (this.style == "0") index = 0;
      else if (this.style == "1") index = 2;
      else if (this.style == "2") index = 3;
      else if (this.style == "3") index = 1;
      this.scene.background = new THREE.CubeTextureLoader().load([
        background[index][0],
        background[index][1],
        background[index][2],
        background[index][3],
        background[index][4],
        background[index][5],
      ]);
    },

    add_floor(long_side, short_side) {
      var index;
      if (this.style == "0") index = 3;
      else if (this.style == "1") index = 4;
      else if (this.style == "2") index = 8;
      else if (this.style == "3") index = 4;
      var floor_texture = new THREE.TextureLoader().load(floor[index]);
      floor_texture.wrapS = THREE.RepeatWrapping;
      floor_texture.wrapT = THREE.RepeatWrapping;
      floor_texture.repeat.set(short_side / 80, long_side / 80);
      const floor_material = new THREE.MeshBasicMaterial({
        map: floor_texture, // 设置纹理贴图
        side: THREE.DoubleSide,
      });
      let floorGeometry = new THREE.PlaneGeometry(
        short_side,
        long_side,
        100,
        100
      ).toNonIndexed(); // ensure each face has unique vertices
      floorGeometry.rotateX(-Math.PI / 2);
      const _floor = new THREE.Mesh(floorGeometry, floor_material);
      this.scene.add(_floor);
    },

    create_text(type, index, board, board_size, x_step, z_step) {
      // text
      const options = {
        size: 0.7,
        height: 0.26,
        font: this.font,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 0.5,
        bevelSegments: 3,
        curveSegments: 12,
      };
      // 创建文本几何体
      var textGeo;
      if (type == "title") {
        if (this.results[index][type] != "")
          textGeo = new TextGeometry(
            "标题：" + this.results[index][type],
            options
          );
        else
          textGeo = new TextGeometry(
            "标题：" +
              this.string_slice(10, 13, this.pics[index].title, index, type),
            options
          );
      } else if (type == "year") {
        if (this.results[index][type] != "")
          textGeo = new TextGeometry(
            "年代：" + this.results[index][type],
            options
          );
        else
          textGeo = new TextGeometry(
            "年代：" +
              this.string_slice(10, 13, this.pics[index].year, index, type),
            options
          );
      } else if (type == "intro") {
        if (this.results[index][type] != "")
          textGeo = new TextGeometry(
            "简介：" + this.results[index][type],
            options
          );
        else
          textGeo = new TextGeometry(
            "简介：" +
              this.string_slice(10, 13, this.pics[index].intro, index, type),
            options
          );
      }
      // 创建材质
      const meshMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
      });
      // 创建文字网格对象
      var mesh = new THREE.Mesh(textGeo, meshMaterial);
      mesh.position.x = board.position.x;
      mesh.position.y = board.position.y;
      mesh.position.z = board.position.z;
      if (x_step != 0)
        mesh.position.x -= (x_step / Math.abs(x_step)) * (board_size / 2 - 1);
      if (z_step != 0)
        mesh.position.z -= (z_step / Math.abs(z_step)) * (board_size / 2 - 1);
      var y_gap;
      if (type == "title") y_gap = 4.4;
      else if (type == "year") y_gap = 5.7;
      else if (type == "intro") y_gap = 7.0;
      mesh.position.y += board_size / 2 - y_gap;
      if (z_step > 0) mesh.rotation.y = -Math.PI / 2;
      if (z_step < 0) mesh.rotation.y = Math.PI / 2;
      if (x_step < 0) mesh.rotation.y = Math.PI;
      // 网格对象添加到场景中
      this.scene.add(mesh);
      this.objects.push(mesh);
    },

    create_image(index, pos, dir, x_step, z_step) {
      new THREE.TextureLoader().load(this.pics[index].pic, (tex) => {
        const img_material = new THREE.MeshBasicMaterial({
          map: tex, // 设置纹理贴图
          side: THREE.DoubleSide,
        });
        let picGeometry,
          pic_size = 35;
        if (dir) {
          if (tex.image.width > tex.image.height)
            picGeometry = new THREE.BoxGeometry(
              pic_size,
              (pic_size * tex.image.height) / tex.image.width,
              1.1
            );
          else
            picGeometry = new THREE.BoxGeometry(
              (pic_size * tex.image.width) / tex.image.height,
              pic_size,
              1.1
            );
        } else {
          if (tex.image.width > tex.image.height)
            picGeometry = new THREE.BoxGeometry(
              1.1,
              (pic_size * tex.image.height) / tex.image.width,
              pic_size
            );
          else
            picGeometry = new THREE.BoxGeometry(
              1.1,
              pic_size,
              (pic_size * tex.image.width) / tex.image.height
            );
        }
        var pic = new THREE.Mesh(picGeometry, img_material);
        pic.position.x = pos.x;
        pic.position.y = 30;
        pic.position.z = pos.z;
        this.scene.add(pic);
        this.objects.push(pic);

        // 信息栏
        const text_board_material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          // transparent: true,
          // opacity: 0.8,
        });
        const text_board_material1 = new THREE.MeshBasicMaterial({
          color: 0x888888,
          // transparent: true,
          // opacity: 0.8,
        });
        let board_geometry, board_geometry1, board_geometry2,
          board_size = 15;
        if (dir) {
          board_geometry = new THREE.BoxGeometry(board_size, 8.4375, 0.5);
          board_geometry1 = new THREE.BoxGeometry(15.1, 8.5375, 0.45);
          board_geometry2 = new THREE.BoxGeometry(16, 9.4375, 0.4);
        } else {
          board_geometry = new THREE.BoxGeometry(0.5, 8.4375, board_size);
          board_geometry1 = new THREE.BoxGeometry(0.45, 8.5375, board_size + 0.1);
          board_geometry2 = new THREE.BoxGeometry(0.4, 9.4375, board_size + 1);
        }
        var board = new THREE.Mesh(board_geometry, text_board_material);
        var board1 = new THREE.Mesh(board_geometry1, text_board_material1);
        var board2 = new THREE.Mesh(board_geometry2, text_board_material);

        x_step = x_step * (3 / 4);
        z_step = z_step * (3 / 4);
        board.position.x = pos.x + x_step;
        board.position.y = 30;
        board.position.z = pos.z + z_step;
        this.scene.add(board);
        this.objects.push(board);
        board1.position.x = pos.x + x_step;
        board1.position.y = 30;
        board1.position.z = pos.z + z_step;
        this.scene.add(board1);
        this.objects.push(board1);
        board2.position.x = pos.x + x_step;
        board2.position.y = 30;
        board2.position.z = pos.z + z_step;
        this.scene.add(board2);
        this.objects.push(board2);

        this.create_text("title", index, board, board_size, x_step, z_step);
        this.create_text("year", index, board, board_size, x_step, z_step);
        this.create_text("intro", index, board, board_size, x_step, z_step);

        //画框
        const img_material_ = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(wall[5]), // 设置纹理贴图
          side: THREE.DoubleSide,
        });
        let pic_Geometry,
          gap_size = 40;
        if (dir) {
          if (tex.image.width > tex.image.height)
            pic_Geometry = new THREE.BoxGeometry(
              gap_size,
              (gap_size * tex.image.height) / tex.image.width,
              1
            );
          else
            pic_Geometry = new THREE.BoxGeometry(
              (gap_size * tex.image.width) / tex.image.height,
              gap_size,
              1
            );
        } else {
          if (tex.image.width > tex.image.height)
            pic_Geometry = new THREE.BoxGeometry(
              1,
              (gap_size * tex.image.height) / tex.image.width,
              gap_size
            );
          else
            pic_Geometry = new THREE.BoxGeometry(
              1,
              gap_size,
              (gap_size * tex.image.width) / tex.image.height
            );
        }
        var pic_ = new THREE.Mesh(pic_Geometry, img_material_);
        pic_.position.x = pos.x;
        pic_.position.y = 30;
        pic_.position.z = pos.z;
        this.scene.add(pic_);
        this.objects.push(pic_);
      });
    },

    add_image(pic_num, long_side, short_side) {
      var count = -1;
      var vertex = [
        {
          x: -short_side / 2,
          z: -long_side / 2,
        },
        {
          x: short_side / 2,
          z: -long_side / 2,
        },
        {
          x: short_side / 2,
          z: long_side / 2,
        },
        {
          x: -short_side / 2,
          z: long_side / 2,
        },
      ];
      for (var i = 0; i < 4; i++) {
        var delta_x, delta_z;
        if (i == 3) {
          delta_x = vertex[0].x - vertex[i].x;
          delta_z = vertex[0].z - vertex[i].z;
        } else {
          delta_x = vertex[i + 1].x - vertex[i].x;
          delta_z = vertex[i + 1].z - vertex[i].z;
        }
        var x_step = 0,
          z_step = 0;
        if (delta_x > 0) x_step = this.pic_dis / 2;
        else if (delta_x < 0) x_step = -this.pic_dis / 2;
        if (delta_z > 0) z_step = this.pic_dis / 2;
        else if (delta_z < 0) z_step = -this.pic_dis / 2;

        for (
          var j = { x: 1, z: 1 };
          Math.abs(j.x * x_step) <= Math.abs(delta_x) &&
          Math.abs(j.z * z_step) <= Math.abs(delta_z);
          //count + 1 < pic_num;
          j = { x: j.x + 2, z: j.z + 2 }
        ) {
          var now_pos = {
            x: vertex[i].x + j.x * x_step,
            z: vertex[i].z + j.z * z_step,
          };
          count++;
          var dir = delta_x == 0 ? 0 : 1;
          this.create_image(count, now_pos, dir, x_step, z_step);
          if (count == pic_num - 1) count = -1;
        }
      }
    },

    string_slice(first_line, second_line, string, index, type) {
      var result = "",
        lines_num = 1;
      function digital_or_letter(char) {
        if (
          (char >= "a" && char <= "z") ||
          (char >= "0" && char <= "9") ||
          (char >= "A" && char <= "Z")
        )
          return true;
        return false;
      }
      var length_cnt = 0,
        first_line_end = 10e9;
      for (var i = 0; i < string.length; i++) {
        result += string[i];
        if (digital_or_letter(string[i])) length_cnt += 0.5;
        else length_cnt += 1;
        if (length_cnt >= first_line) {
          result += "\n";
          lines_num++;
          first_line_end = i;
          length_cnt = 0;
          break;
        }
      }
      for (var j = first_line_end + 1; j < string.length; j++) {
        result += string[j];
        if (digital_or_letter(string[j])) length_cnt += 0.5;
        else length_cnt += 1;
        if (length_cnt >= second_line) {
          result += "\n";
          length_cnt = 0;
          lines_num++;
          if (index >= 0 && lines_num == 5) break;
          if (index == -1 && lines_num == 6) break;
        }
      }
      if (index >= 0) this.results[index][type] = result;
      return result;
    },

    create_exhibit_text(type) {
      // text
      const options = {
        size: 3,
        height: 0.01,
        font: this.font,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 0.5,
        bevelSegments: 3,
        curveSegments: 12,
      };
      // 创建文本几何体
      var textGeo;
      if (type == "title")
        textGeo = new TextGeometry(
          "展览主题：" + this.string_slice(27, 32, this.exhibit.title, -1, ""),
          options
        );
      else if (type == "intro")
        textGeo = new TextGeometry(
          "简介：" + this.string_slice(29, 32, this.exhibit.intro, -1, ""),
          options
        );
      // 创建材质
      const meshMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
      });
      // 创建文字网格对象
      var mesh_1 = new THREE.Mesh(textGeo, meshMaterial);
      mesh_1.position.x = 5.011;
      mesh_1.position.y = 0;
      mesh_1.position.z = 68;

      var mesh_2 = new THREE.Mesh(textGeo, meshMaterial);
      mesh_2.position.x = -5.011;
      mesh_2.position.y = 0;
      mesh_2.position.z = -68;

      var y_gap;
      if (type == "title") y_gap = 12;
      else if (type == "intro") y_gap = 20;
      mesh_1.position.y += 60 - y_gap;
      mesh_2.position.y += 60 - y_gap;

      mesh_1.rotation.y = Math.PI / 2;
      mesh_2.rotation.y = -Math.PI / 2;

      // 网格对象添加到场景中
      this.scene.add(mesh_1);
      this.objects.push(mesh_1);
      this.scene.add(mesh_2);
      this.objects.push(mesh_2);
    },

    add_exhibit_text() {
      const text_wall_material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      let text_wall_geometry = new THREE.BoxGeometry(10, 61, 150);
      var text_wall = new THREE.Mesh(text_wall_geometry, text_wall_material);
      text_wall.position.x = 0;
      text_wall.position.y = 29;
      text_wall.position.z = 0;
      this.scene.add(text_wall);
      this.objects.push(text_wall);

      this.create_exhibit_text("title");
      this.create_exhibit_text("intro");
    },

    add_logo() {
      // text
      const options = {
        size: 10,
        height: 0.01,
        font: this.font_en,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 0.5,
        bevelSegments: 3,
        curveSegments: 12,
      };
      // 创建文本几何体
      var textGeo_F = new TextGeometry("F", options);
      var textGeo_A = new TextGeometry("A", options);
      var textGeo_i = new TextGeometry("i", options);
      var textGeo_xer = new TextGeometry("xer", options);
      // 创建材质
      const meshMaterial_Fxer = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const meshMaterial_A = new THREE.MeshBasicMaterial({
        color: 0x2586ff,
      });
      const meshMaterial_i = new THREE.MeshBasicMaterial({
        color: 0xe3676b,
      });
      var begin_z = -30;
      // 创建文字网格对象
      var mesh_F_1 = new THREE.Mesh(textGeo_F, meshMaterial_Fxer);
      mesh_F_1.position.x = 5.011;
      mesh_F_1.position.y = 3;
      mesh_F_1.position.z = begin_z;

      var mesh_F_2 = new THREE.Mesh(textGeo_F, meshMaterial_Fxer);
      mesh_F_2.position.x = -5.011;
      mesh_F_2.position.y = 3;
      mesh_F_2.position.z = -begin_z;

      mesh_F_1.rotation.y = Math.PI / 2;
      mesh_F_2.rotation.y = -Math.PI / 2;

      var mesh_A_1 = new THREE.Mesh(textGeo_A, meshMaterial_A);
      mesh_A_1.position.x = 5.011;
      mesh_A_1.position.y = 3;
      mesh_A_1.position.z = begin_z - 6.5;

      var mesh_A_2 = new THREE.Mesh(textGeo_A, meshMaterial_A);
      mesh_A_2.position.x = -5.011;
      mesh_A_2.position.y = 3;
      mesh_A_2.position.z = -begin_z + 6.5;

      mesh_A_1.rotation.y = Math.PI / 2;
      mesh_A_2.rotation.y = -Math.PI / 2;

      var mesh_i_1 = new THREE.Mesh(textGeo_i, meshMaterial_i);
      mesh_i_1.position.x = 5.011;
      mesh_i_1.position.y = 3;
      mesh_i_1.position.z = begin_z - 16.5;

      var mesh_i_2 = new THREE.Mesh(textGeo_i, meshMaterial_i);
      mesh_i_2.position.x = -5.011;
      mesh_i_2.position.y = 3;
      mesh_i_2.position.z = -begin_z + 16.5;

      mesh_i_1.rotation.y = Math.PI / 2;
      mesh_i_2.rotation.y = -Math.PI / 2;

      var mesh_xer_1 = new THREE.Mesh(textGeo_xer, meshMaterial_Fxer);
      mesh_xer_1.position.x = 5.011;
      mesh_xer_1.position.y = 3;
      mesh_xer_1.position.z = begin_z - 19.5;

      var mesh_xer_2 = new THREE.Mesh(textGeo_xer, meshMaterial_Fxer);
      mesh_xer_2.position.x = -5.011;
      mesh_xer_2.position.y = 3;
      mesh_xer_2.position.z = -begin_z + 19.5;

      mesh_xer_1.rotation.y = Math.PI / 2;
      mesh_xer_2.rotation.y = -Math.PI / 2;

      // 网格对象添加到场景中
      this.scene.add(mesh_F_1);
      this.objects.push(mesh_F_1);
      this.scene.add(mesh_F_2);
      this.objects.push(mesh_F_2);
      this.scene.add(mesh_A_1);
      this.objects.push(mesh_A_1);
      this.scene.add(mesh_A_2);
      this.objects.push(mesh_A_2);
      this.scene.add(mesh_i_1);
      this.objects.push(mesh_i_1);
      this.scene.add(mesh_i_2);
      this.objects.push(mesh_i_2);
      this.scene.add(mesh_xer_1);
      this.objects.push(mesh_xer_1);
      this.scene.add(mesh_xer_2);
      this.objects.push(mesh_xer_2);
    },

    create_wall(side, move_dist, need_rotate, x_or_z) {
      var index;
      if (this.style == "0") index = 4;
      else if (this.style == "1") index = 5;
      else if (this.style == "2") index = 7;
      else if (this.style == "3") index = 5;
      var wall_texture = new THREE.TextureLoader().load(wall[index]);
      wall_texture.wrapS = THREE.RepeatWrapping;
      wall_texture.wrapT = THREE.RepeatWrapping;
      wall_texture.repeat.set(Math.ceil(side / 80), 1);
      var wall_material;
      if (this.style == "3") {
        wall_material = new THREE.MeshBasicMaterial({
          map: wall_texture, // 设置纹理贴图
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.2,
        });
      } else {
        wall_material = new THREE.MeshBasicMaterial({
          map: wall_texture, // 设置纹理贴图
          side: THREE.DoubleSide,
        });
      }
      let wallGeometry = new THREE.PlaneGeometry(
        side,
        60,
        Math.ceil(side / 20),
        3
      ).toNonIndexed(); // ensure each face has unique vertices

      wallGeometry.translate(0, 30, 0);
      if (need_rotate) wallGeometry.rotateY(-Math.PI / 2);
      if (x_or_z) wallGeometry.translate(move_dist, 0, 0);
      else wallGeometry.translate(0, 0, move_dist);

      var _wall = new THREE.Mesh(wallGeometry, wall_material);
      this.scene.add(_wall);
    },

    add_wall(long_side, short_side) {
      this.create_wall(long_side, short_side / 2, true, 1);
      this.create_wall(long_side, -short_side / 2, true, 1);
      this.create_wall(short_side, long_side / 2, false, 0);
      this.create_wall(short_side, -long_side / 2, false, 0);
    },

    init() {
      this.scene = new THREE.Scene();
      this.scene.add(this.controls.getObject());

      //光源（目前用不到）
      // const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
      // light.position.set(0.5, 1, 0.75);
      // this.scene.add(light);

      function max(x, y) {
        return x > y ? x : y;
      }

      this.pic_dis = 80;
      var pic_num = this.pics.length;
      var long_side = max(
          6 * this.pic_dis + 10,
          this.pic_dis * Math.ceil(pic_num / 3.0) + 10
        ),
        short_side = max(
          4 * this.pic_dis + 10,
          this.pic_dis * Math.ceil(pic_num / 6.0) + 10
        );

      this.camera_restrict.z.min = -long_side / 2 + 10;
      this.camera_restrict.z.max = long_side / 2 - 10;
      this.camera_restrict.x.min = -short_side / 2 + 10;
      this.camera_restrict.x.max = short_side / 2 - 10;

      for (var i = 0; i < pic_num; i++)
        this.results.push({ title: "", year: "", intro: "" });

      // background
      this.add_background();

      // floor
      this.add_floor(long_side, short_side);

      const textLoader_zh = new FontLoader();
      const textLoader_en = new FontLoader();
      //导入字体
      textLoader_zh.load(
        `${process.env.BASE_URL}font/STZhongsong_Regular.json`,
        (font_zh) => {
          this.font = font_zh;
          textLoader_en.load(
            `${process.env.BASE_URL}font/font1.typeface.json`,
            (font_en) => {
              this.font_en = font_en;
              // image
              this.add_exhibit_text();
              this.add_logo();
              if (pic_num > 0) this.add_image(pic_num, long_side, short_side);
            }
          );
        }
      );

      // wall
      this.add_wall(long_side, short_side);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      //
      window.addEventListener("resize", this.onWindowResize);
    },

    animate() {
      requestAnimationFrame(this.animate);

      const time = performance.now();

      if (this.controls.isLocked == true) {
        const delta = (time - this.prevTime) / 1000;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;

        this.velocity.y -= 9.8 * 150.0 * delta; // 100.0 = mass

        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize(); // this ensures consistent movements in all directions

        if (this.moveForward || this.moveBackward)
          this.velocity.z -= this.direction.z * 800.0 * delta;

        if (this.moveLeft || this.moveRight)
          this.velocity.x -= this.direction.x * 800.0 * delta;

        if (this.canMove(-this.velocity.x * delta, 0))
          this.controls.moveRight(-this.velocity.x * delta);
        if (this.canMove(-this.velocity.z * delta, 1))
          this.controls.moveForward(-this.velocity.z * delta);

        this.controls.getObject().position.y += this.velocity.y * delta; // new behavior

        if (this.controls.getObject().position.y < 30) {
          this.velocity.y = 0;
          this.controls.getObject().position.y = 30;

          this.canJump = true;
        }
      }
      this.prevTime = time;
      this.renderer.render(this.scene, this.camera);
    },

    canMove(distance, right_or_forward) {
      var _vector = new THREE.Vector3();
      //var tmp = new THREE.PerspectiveCamera().ma
      var camera = new THREE.PerspectiveCamera().copy(this.camera);
      _vector.setFromMatrixColumn(camera.matrix, 0);

      if (right_or_forward) _vector.crossVectors(camera.up, _vector);

      camera.position.addScaledVector(_vector, distance);
      if (
        this.inMiddle(
          this.camera_restrict.x.min,
          this.camera_restrict.x.max,
          camera.position.x
        ) &&
        this.inMiddle(
          this.camera_restrict.z.min,
          this.camera_restrict.z.max,
          camera.position.z
        ) &&
        !(
          this.inMiddle(-85, 85, camera.position.z) &&
          this.inMiddle(-15, 15, camera.position.x)
        )
      )
        return true;
      return false;
    },

    inMiddle(min, max, x) {
      if (x < max && x > min) return true;
      return false;
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>


<style scoped>
#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#instructions {
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
}
.button {
  /* background-color: #134857; */
  border: none;
  color: whitesmoke;
  font-size: 36px;
}
</style>