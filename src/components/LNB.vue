<template>
  <nav
    ref="nav"
    :style="{width: `${navWidth}px`}">
    <div class="header">
      <div class="user-profile"></div>
      Padd's Notion
    </div>
    <ul>
      <WorkspaceItem
        v-for=" workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="$store.dispatch('workspace/createWorkspaces')">
        <span class="material-icons">add</span> 새로운 페이지
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth=240">
    </div>
  </nav>
</template>

<script>
import interact from 'interactjs'
import WorkspaceItem from './WorkspaceItem.vue'
export default {
  components:{
    WorkspaceItem
  },
  data(){
    return{
      navWidth: 240
    }
  },
  computed:{
    workspaces(){
      return this.$store.state.workspace.workspaces
    }
  },
  created(){
    this.workspacesInit()
  },
  mounted(){
    this.navInit()
  }
  ,
  methods:{
    navInit(){
      interact(this.$refs.nav)
      .resizable({
        edges:{
          right: this.$refs.resizeHandle
        }
      })
      .on('resizemove', (e)=>{
        this.navWidth = e.rect.width
      })
    },
    async workspacesInit(){
      await this.$store.dispatch('workspace/readWorkspaces')
      if(this.$route.fullPath === '/'){
        this.$router.push({
          name: 'Workspace',
          params:{
            id:this.$store.state.workspace.workspaces[0].id
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

nav{
  max-width: 500px;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  background-color: $color-background;
  position: relative;

  .header{
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;

    .user-profile{
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url('https://avatars.githubusercontent.com/u/65111990?v=4');
      background-size: cover;
    }
  }

  ul{
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .actions{
    border-top: 1px solid $color-border;

    .action{
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: $color-font;
      cursor: pointer;
      &:hover{
        background-color: $color-background--hover1;
      }
      .material-icons{
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }

  .resize-handle{
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    transition: .4s;
    &:hover{
      background-color:  $color-border;
    }
  }
}
</style>
