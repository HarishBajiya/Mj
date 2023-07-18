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
                        <a target="_top" onclick="sendEmail();"
                            href="mailto:bajiya.manoj26@gmail.com" class="font-weight-bold white--text"
                        >bajiya.manoj26@gmail.com</a>
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
                            href="https://www.instagram.com/dp_manojbajiya/" class="font-weight-bold white--text"
                        >@dp_manojbajiya</a>
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
                            href="https://wa.me/918107391945"
                        >+91 XXXX XXXX 45</a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item three-line>
                <v-list-item-icon>
                         <v-icon size="35" color="#006064"> mdi-office-building-marker </v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1"> Address </v-list-item-title>
                    <v-list-item-subtitle>
                        Want to meet?
                        <span
                        class="font-weight-bold white--text">
                        Mumbai, Maharashtra, India
                    </span>
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
    },

    methods: {
        sendEmail(){        
            window.location = "mailto:bajiya.manoj26@gmail.com";
        }
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