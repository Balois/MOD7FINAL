<template>
  <div class="container">
      <h5>Areas</h5>
  
      <div class="card">
          <div class="card-content">
              <form @submit.prevent="nuevo()">
                  <h5>Nueva area</h5>
                  <p>Nombre area: <input type="text" v-model="payload.nombrearea" required/></p>
                  <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
              </form>
          </div>
      </div>
  
      <div class="card">
          <div class="card-content">
              <form @submit.prevent="getList()">
                  <h5>Buscar area</h5>
                  <p>Nombre area: <input type="search" v-model="search" @search="getList()" /></p>
                  <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
              </form>
          </div>
      </div>
  
      <div class="card">
          <div class="card-content">
              <h5>filtros</h5>
              <div class="input-field ">
                  <select @change="filter('active',$event.target.value)">
                      <option value="" selected>todos</option>
                      <option value="true">activo</option>
                      <option value="false">inactivo</option>
                  </select>
                  <label>Materialize Select</label>
              </div>
  
          </div>
      </div>
  
      <div class="card">
          <div class="card-content">
              <table>
                  <thead>
                      <tr>
                          <th>Id</th>
                          <th>Nombre</th>
                          <th>Encargado</th>
                          <th>Nro Funcionarios</th>
                          <th></th>
                      </tr>
                  </thead>
  
                  <tbody>
                      <tr v-for="item in items">
                          <td>{{item.id}}</td>
                          <td>{{item.nombrearea}}</td>
                          <td>{{item.encargado}}</td>
                          <td>{{item.funcionarios}}</td>
                          <td>
                              <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(item.id)" >delete</i></a>
                              <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AreaView',
  data() {
      const api = process.env.VUE_APP_API;
      return {
          api,
          items: [],
          search: '',
          toFilter: '',
          payload: {
            nombrearea: null,
            encargado: null,
            funcionarios: null
          }
      }
  },
  methods: {
      filter(nombrearea, value) {
          this.toFilter = value === '' ? '' : '&' + nombrearea + '=' + value;
          this.getList();
      },
      update(id) {
          this.$router.push('/area/' + id);
      },
      eliminar(id) {
          if (confirm("Esta seguro de eliminar?.")) {
              this.axios({
                  method: 'delete',
                  url: this.api + '/areas/' + id
              }).
              then((response) => {
                  this.getList();
              }).
              catch((error) => {
                  console.log(error);
              });
          }
      },
      nuevo() {
          this.axios({
              method: 'post',
              url: this.api + '/areas',
              data: this.payload
          }).
          then((response) => {
              this.getList();
              console.log(response);
          }).
          catch((error) => {
              console.log(error);
          });
      },
      getList() {

          this.axios({
              method: 'get',
              url: this.api + '/areas?q='
          }).
          then((response) => {
              this.items = response.data;
          }).
          catch((error) => {
              console.log(error);
          })
      }
  },
  components: {

  },
  mounted() {
      this.getList();
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
  }
}
</script>