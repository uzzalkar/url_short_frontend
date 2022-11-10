<template>
    <div class="mt-5">
        <div class="card">
            <div class="card-header border-0">
                <div class="card-title m-0">
                    <h3 class="">Link Short Create Form</h3>
                </div>
            </div>
            <div class="card-body">
                <div v-show="show" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <span v-for="(err, index) in validation_errors" :key="index">{{ err[0] }} <br/></span>
                </div>
                <div v-if="message" class="alert alert-success alert-dismissible fade show" role="alert">
                    <span>{{ message }}</span> <br>
                    <span id="link" ref="link" class="me-3 link">{{ generate_short_link }}</span>
                  <button @click="copy">Copy</button>
                </div>
                <form action="">
                    <div class="form-row">
                        <div class="col-md-6 col-sm-6 col-lg-6">
                            <label for="long_url" class="col-form-label">Long URL*</label>
                            <input type="text" v-model="long_url" id="long_url" name="long_url" class="form-control" placeholder="Enter link here" required/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2" @click.prevent="createLink">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "CreateShortLink",
    data() {
        return {
            show: false,
            long_url: '',
            validation_errors: {},
            generate_short_link: '',
            message: '',
        }
    },
    methods: {
        createLink() {
            axios.post(process.env.VUE_APP_API_URL + '/link-short/store', {long_url: this.long_url}).then(response => {
                this.long_url = ''
                this.message = response.data.message
                this.generate_short_link = response.data.short_url
            }).catch(error => {
                this.show = true
                this.validation_errors = error.response.data.errors
                this.hide()
            })
        },
        copy() {
          let text = document.getElementById("link").innerHTML;
          navigator.clipboard.writeText(text);
        },
        hide() {
            setTimeout(() => {
                this.show = false
            }, 5000)
        },
    }
}
</script>

<style scoped>

</style>
