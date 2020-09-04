import { getData } from '@/api/index'
import { rules } from '@/utils/validate'
export const mixinObj = {
    computed: {
        rules: () => {
            return rules;
        }
    },
    
    data(){
        return {
            percent: 0,
            subjectList: [],
        }
    },
    created () {
        this.getSubjectData()
    },
    methods: {
        handleReset () {
            this.form.resetFields();
        },
        getSubjectData (value) {
            getData('/dp-collection/specialSubject/list', { name: value }).then(res => {
                this.subjectList = res.data
            }).catch(err => {
                console.log(err);
            })
        },
        getInsData (value) {
            getData('/dp-collection/specialSubject/institutionList', { name: value}).then(res => {
                console.log(res.data);
                // this.total
            }).catch(err => {
                console.log(err);
            })
        }
    }
}