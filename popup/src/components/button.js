export default {
    props: ['title', 'fill'],
    data() {
        return { status: false }
    },
    methods: {
        flipStatus() {
            this.status = !this.status
        }
    },
    computed: {
        size() {
            return this.status ? 24 : 12
        }
    }
}
