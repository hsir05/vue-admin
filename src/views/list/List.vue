<template>
  <section>
    <!-- 搜索 -->
    <a-form
      layout="inline"
      :form="form"
      @submit="handleSubmit"
      class="search-wrap"
    >
      <a-form-item>
        <a-input placeholder=""> </a-input>
      </a-form-item>
      <a-form-item>
        <a-input type="password" placeholder=""> </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
      </a-form-item>
    </a-form>

    <!-- table -->
    <section class="btn-wrap">
      <a-button type="primary" @click="handleAdd">Add</a-button>
    </section>
    <section class="table-wrap">
      <a-table bordered :dataSource="dataSource" :columns="columns" :rowSelection="rowSelection">
        <!-- <template slot="name" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
            </template> -->
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </section>
  </section>
</template>

<script>
// import EditableCell from './EditableCell';
 const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
export default {
  components: {
    //   EditableCell,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0"
        },
        {
          key: "1",
          name: "Edward King 1",
          age: "32",
          address: "London, Park Lane no. 1"
        }
      ],
      rowSelection,
      count: 2,
      columns: [
           {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: "name",
          dataIndex: "name",
          width: "30%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "age",
          dataIndex: "age"
        },
        {
          title: "address",
          dataIndex: "address"
        },
        {
          title: "operation",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    }
  }
};
</script>
<style lang="scss" scope>

</style>
