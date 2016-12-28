import debounce from 'lodash.debounce'

export default {
    props: ['title', 'fill'],
    data() {
        return {
            status: false,
            tooltipStatus: false
        }
    },
    watch: {
        status(newStatus) {
            this.tooltipStatus = false
            debounce(() => {
                if (this.status) {
                    this.tooltipStatus = true
                }
            }, 1000)()
        }
    },
    methods: {
        flipStatus() {
            this.status = !this.status
        },
    },
    computed: {
        size() {
            return this.status ? 24 : 12
        }
    }
}
