<script setup></script>

<template>
  <header>
    <div class="header-content">
      <RouterLink to="/">
        <div class="logo">FlowStat</div>
      </RouterLink>

      <nav class="menu">
        <ul class="menu-list">
          <li><RouterLink to="/settings"> params </RouterLink></li>

          <li>profile</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
header {
  background: rgb(97, 39, 131);
}

.header-content {
  padding: 10px 30px;
  max-width: 2560px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
}

.logo {
  font-size: 30px;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.menu-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.menu-list > li {
  color: rgb(255, 255, 255);
  font-size: 22px;
  font-weight: 300;
}
</style>
