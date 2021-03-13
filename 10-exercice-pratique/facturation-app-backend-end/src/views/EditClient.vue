<template>
  <!-- template du composant (HTML) -->
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2" />{{ form._id ? 'Editer':'Créer' }} un Client</h3>
        <hr />
      </b-col>
    </b-row>

    <b-card class="shadow p-3" >
      <h4>Contact</h4>
      <b-row>
        <b-col lg="4">

          <b-form-group
            id="fieldset-firstname"
            label="Prénom"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="clientFirstname"
          >
            <b-form-input id="clientFirstname" v-model="form.clientFirstname" />
          </b-form-group>

          <b-form-group
            id="fieldset-function"
            label="Fonction"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="function"
          >
            <b-form-input id="function" v-model="form.clientFunction" />
          </b-form-group>


        </b-col>

        <b-col lg="4">

          <b-form-group
            id="fieldset-lastname"
            label-cols-md="4"
            content-cols-md="8"
            label="Nom"
            label-for="lastname"
          >
            <b-form-input id="lastname" v-model="form.clientLastname"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-phone"
            label-cols-md="4"
            content-cols-md="8"
            label="Téléphone"
            label-for="phone"
          >
            <b-form-input id="phone" v-model="form.clientPhone"></b-form-input>
          </b-form-group>

        </b-col>

        <b-col lg="4">

          <b-form-group
            id="fieldset-date"
            label="Date d'ajout"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="date"
          >
            <b-form-datepicker 
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              id="date"
              v-model="form.clientAddDate" />
          </b-form-group>

        </b-col>
        
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-email"
            label-cols-md="4"
            content-cols-md="8"
            label="Email"
            label-for="email"
          >
            <b-form-input id="email" v-model="form.clientEmail"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-society"
            label-cols-md="4"
            content-cols-md="8"
            label="Entreprise"
            label-for="society"
          >
            <b-form-input id="society" v-model="form.clientSociety"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>      

      <h4>Coordonnées</h4>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-firstaddress"
            label-cols-md="4"
            content-cols-md="8"
            label="Adresse 1"
            label-for="firstaddress"
          >
            <b-form-input id="firstaddress" v-model="form.clientFirstAddress"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="12" >
          <b-form-group
            id="fieldset-secondaddress"
            label-cols-md="4"
            content-cols-md="8"
            label="Adresse 2"
            label-for="secondaddress"
          >
            <b-form-input id="secondaddress" v-model="form.clientSecondAddress"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>  

      <b-row>
        <b-col lg="4">

          <b-form-group
            id="fieldset-postalcode"
            label="Code Postal"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="postalcode"
          >
            <b-form-input id="postalcode" v-model="form.clientPostalCode" />
          </b-form-group>

          <b-form-group
            id="fieldset-country"
            label="Pays"
            label-cols-lg="4"
            content-cols-lg="8"
            label-for="country"
          >
            <b-form-input id="country" v-model="form.clientCountry" />
          </b-form-group>

      </b-col> 

      <b-col lg="4">
        <b-form-group
          id="fieldset-city"
          label="Ville"
          label-cols-lg="4"
          content-cols-lg="8"
          label-for="city"
        >
          <b-form-input id="city" v-model="form.clientCity" />
        </b-form-group>

      </b-col>   
    </b-row>   

    <b-row>
      <b-col>
        <b-button variant="danger" @click="onDeleteClient()">Supprimer</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="primary" @click="onSaveClient()">Enregister</b-button>
      </b-col>
    </b-row>              

    </b-card>

    <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox>

    <pre v-if="debug" class="debug card border-primary bg-dark text-light p-4">
      Form: {{ form }}
      Client (du store): {{ client }}
    </pre>

  </b-container>

</template>


<script>

import { mapState, mapActions } from 'vuex'


const newClient = {

  clientFirstname: '',
  clientLastname: '',
  clientPhone: '',
  clientFunction: '',
  clientEmail: '',
  clientSociety: '',
  clientAddDate: new Date(),
  clientFirstAddress: '',
  clientSecondAddress: '',
  clientPostalCode: '',
  clientCountry: '',
  clientCity: '',  
}

export default {
  name: 'EditClient',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      debug: true,

      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    }),
  },
  methods: {
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),
    

    onDeleteClient(){
      this.deleteClient(this.form._id)
      
      this.$router.push({ name: 'clients' })
    },

    onSaveClient(){
      
      this.saveClient( this.form ).then(()=> {
        this.$router.push({ name: 'clients' })  
      })


    }
  },
  created() {
    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>


<style scoped>

</style>