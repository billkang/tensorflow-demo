<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="待预测值">
      <el-input v-model="form.input" />
    </el-form-item>
    <el-form-item label="预测结果">
      {{ form.result }}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">预测</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const form = reactive({
  input: '',
  result: '',
});

const xs = [1, 2, 3, 4, 5, 6];
const ys = [1, 3, 5, 7, 9, 11];

const inputs = tf.tensor(xs);
const labels = tf.tensor(ys);

tfvis.render.scatterplot(
  { name: '线性回归数据集', tab: '数据集展示' },
  { values: xs.map((x, i) => ({ x, y: ys[i] })) },
  { xAxisDomain: [0, 8], yAxisDomain: [0, 15] }
);

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({
  loss: tf.losses.meanSquaredError,
  optimizer: tf.train.sgd(0.01),
  metrics: ['accuracy'],
});

await model.fit(inputs, labels, {
  batchSize: 4,
  epochs: 10,
  callbacks: tfvis.show.fitCallbacks({ name: '训练过程', tab: '训练数据' }, ['loss', 'acc']),
});

const onSubmit = () => {
  const output = model.predict(tf.tensor([+form.input]));
  form.result = output.dataSync()[0];
};
</script>
