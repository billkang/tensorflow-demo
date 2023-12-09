<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="/logistic" router>
        <el-menu-item index="/logistic">
          <span>线性回归</span>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Navigator Three</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </el-main>
  </el-container>
</template>

<script setup lang="ts"></script>
