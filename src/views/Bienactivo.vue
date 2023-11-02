<template>
    <div class="container">
        <h5>Activos</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()">
                    <h5>Nuevo activo</h5>
                    <p>Tipo Activo: <input type="text" v-model="payload.tipoactivo" required/></p>
                    <p>Marca: <input type="text" v-model="payload.marca" required/></p>
                    <p>Modelo: <input type="text" v-model="payload.modelo" required/></p>
                    <p>Estado: <input type="text" v-model="payload.estado" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="getList()">
                    <h5>Buscar activo</h5>
                    <p>Tipo Activo: <input type="search" v-model="search" @search="getList()" /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <h5>filtros</h5>
                <div class="input-field ">
                    <select @change="filter('active',$event.target.value)">
                        <option value="" selected>Nuevo</option>
                        <option value="true">Regular</option>
                        <option value="false">Malo</option>
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
                            <th>Tipo Activo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.tipoactivo}}</td>
                            <td>{{item.marca}}</td>
                            <td>{{item.modelo}}</td>
                            <td>{{item.estado}}</td>
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
    name: 'BienactivoView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            search: '',
            toFilter: '',
            payload: {
                tipoactivo: null,
                marca: null,
                modelo: null,
                estado: true
            }
        }
    },
    methods: {
        filter(estado, value) {
            this.toFilter = value === '' ? '' : '&' + estado + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/bienactivo/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/bienactivo/' + id
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
                url: this.api + '/bienesactivos',
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
        getList(tipoactivo, value) {

            this.axios({
                method: 'get',
                url: this.api + '/bienesactivos?q=' + this.search + this.toFilter
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
