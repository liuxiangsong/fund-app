<template>
  <div class="fund-container">
    <section class="fund-base-info">
      <div class="fund-name">{{fundBaseInfo.name}}</div>
      <div class="fund-code" @click="handleClick">{{fundBaseInfo.code}} </div>
      <div class="fund-rating">晨星评级：
        <a-rate v-model:value="rating" allow-half disabled />
      </div>
    </section>
    <section class="detail">
      <div class="col">
        <div class="lable">净值</div>
        <div class="value">￥<span class="net-value">{{fundBaseInfo.netValue}}</span></div>
      </div>
      <div class="col">
        <div class="lable">基金经理</div>
        <div class="value">{{fundBaseInfo.managerName}}</div>
      </div>
      <div class="col">
        <div class="lable">总资产</div>
        <div class="value">{{fundBaseInfo.fundSize}}</div>
      </div>
      <div class="col">
        <div class="lable">成立日期 </div>
        <div class="value">{{fundBaseInfo.foundDate}}</div>
      </div>
      <div class="col">
        <div class="lable">类型</div>
        <div class="value">{{fundBaseInfo.foundType}}</div>
      </div>
      <div class="col">
        <div class="lable">基金公司</div>
        <div class="value">{{fundBaseInfo.fundCompany}}</div>
      </div>
    </section>
    <section class="position">
      <div class="caption">持仓分析
        <span class="remarks">{{fundPostion.sourceMark}} | {{fundPostion.endDate}}</span>
      </div>
      <div class="catogray">
        <div class="stock">
          <div class="row title">
            <div>重仓股</div>
            <div>占比(%)</div>
          </div>
          <div class="row" v-for="stock in fundPostion.stockList" :key="stock.code">
            <div>{{stock.name}} <span class="code">{{stock.code}}</span></div>
            <div>{{stock.percent}}</div>
          </div>
        </div>
        <div class="bond">
          <div class="row title">
            <div>债基</div>
            <div>占比(%)</div>
          </div>
          <div class="row" v-for="stock in fundPostion.bondList" :key="stock.code">
            <div>{{stock.name}} <span class="code">{{stock.code}}</span></div>
            <div>{{stock.percent}}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="managers">
      <div class="caption">基金经理</div>
       <div class="manager">
         <div class="row" v-for="manager in fundManagers.managers" :key="manager.name">
            <div class="name">{{manager.name}}
            <div class="duration">{{manager.inaugurationDate}}-{{manager.resignDate||'至今'}}</div>
            </div>
            <div>{{manager.tenureDuration}}</div>
            <div>{{manager.yieldRate}}</div>
          </div>
       </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FundInfo',
  props: {
    fundBaseInfo: Object,
    fundPostion: Object,
    fundManagers: Object,
  },
  setup(props) {
    const handleClick = async () => {
      console.log('props :>> ', props);
    };
    const rating = computed(() => (props.fundBaseInfo ? props.fundBaseInfo.rating : 0));
    return { handleClick, rating };
  },
});
</script>

<style lang="scss" scoped>
  .fund-container {
    color: #333;
    .caption {
      font-size: 24px;
      font-weight: 700;
      line-height: 72px;
      .remarks {
        font-size: 12px;
        font-weight: 400;
        color: #999;
      }
    }
    .fund-base-info {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 72px;
      border-bottom: 1px solid #e8e8e8;
      .fund-code {
        padding: 0 48px 0 16px;
      }
      .fund-rating {
        font-size: 17px;
      }
    }
    .detail {
      display: flex;
      padding-top: 12px;
      text-align: center;
      .col {
        padding-left: 24px;
        line-height: 30px;
        color: #333;
        .lable {
          font-weight: 700;
        }
        .value {
          .net-value {
            font-weight: 500;
            font-size: 22px;
          }
        }
      }
    }
    .position {
      margin-top: 24px;
      border-top: 1px solid #e8e8e8;
      .catogray {
        display: flex;
        // justify-content: space-around;;
        & > div:not(:last-child) {
          margin-right: 45px;
          padding-right: 45px;
          border-right: 1px solid #e8e8e8;
        }
        .row {
          display: flex;
          line-height: 29px;
          font-size: 17px;
          font-weight: 400;
          &.title {
            font-weight: 600;
            // text-align: center;
          }
          .code {
            font-size: 12px;
            color: #999;
          }
          & > div:first-child {
            width: 200px;
          }
        }
      }
    }
    .managers{
       margin-top: 24px;
      border-top: 1px solid #e8e8e8;
      .manager{
       .row{
          display: flex;
          &>div{
            line-height: 48px;
            height: 48px;
          }
          .name{
            line-height: 17px;
             padding-top: 8px;
             .duration{
                font-size: 12px;
            color: #999;
             }
          }
          &>:first-child{
            width:190px;
          }
          &>:nth-child(2){
            width:150px;
          }
       }
      }
    }
  }
</style>
