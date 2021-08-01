<template>
    <div class="contact pa-5">
        <v-row justify="center" align-content="center">
        <v-card class="contactCard" outlined>
            <v-list-item three-line>
                 <v-list-item-icon >
                         <v-icon size="35" color="#006064"> mdi-gmail </v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                   
                    <v-list-item-title class="headline mb-1">Email</v-list-item-title>
                    <v-list-item-subtitle>
                        Email me anytime at
                        <a
                            href="mailto:manoj@take2films.co.in" class="font-weight-bold white--text"
                        >manoj@take2films.co.in</a>.
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item three-line>
                <v-list-item-icon>
                         <v-icon size="35" color="#006064"> mdi-instagram </v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">Instagram</v-list-item-title>
                    <v-list-item-subtitle>
                        I also have a Instagram, DM me if you have any questions.
                        <a
                            href="https://www.instagram.com/dop_manojbajiya/" class="font-weight-bold white--text"
                        >@dop_manojbajiya</a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item three-line>
                <v-list-item-icon >
                         <v-icon size="35" color="#006064"> mdi-whatsapp </v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1"> Whatsapp </v-list-item-title>
                    <v-list-item-subtitle>
                        You can ping me on Whatsapp
                        <a class="font-weight-bold white--text"
                            href="https://api.whatsapp.com/send?phone==918107391945/"
                        >+91 810 739 1945</a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item three-line>
                <v-list-item-icon>
                         <v-icon size="35" color="#006064"> mdi-office-building-marker </v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1"> Address </v-list-item-title>
                    <v-list-item-subtitle>
                        Want to meet?
                        <a href="https://www.google.com/maps/place/Take2+Films+%26+Equipments+Pvt.+Ltd./@28.500385,77.1870039,17z/data=!3m1!4b1!4m5!3m4!1s0x390d02ee96b373b5:0x6f9a3c3370cfd3a7!8m2!3d28.500385!4d77.1891926"
                        class="font-weight-bold white--text">
                        A-178, Upper Ground Street, No. 22, Chattarpur Enclave Phase 2, Chhatarpur, Delhi 110074
                        </a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

        </v-card>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style scoped>
.contactCard {
    align-content: center;
    text-align: left;
    margin-top: 10%;
}
.contactIcon {
    margin: 5%;
    padding-top: 0px;
}
</style>