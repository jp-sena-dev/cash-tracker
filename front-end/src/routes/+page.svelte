<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowDown from '../componentes/ArrowDown.svelte';
	import ArrowUp from '../componentes/ArrowUp.svelte';
	import CashFlowCard from '../componentes/CashFlowCard.svelte';
	import Modal from '../componentes/Modal.svelte';
	import axios from 'axios';
	import type { CashFlow, FinancialSummary, TransactionType } from '../types/cash-flow';

  let loading = true;
  let showModal = false;
  let financialSummary: FinancialSummary;
  let cashFlowList: CashFlow[];

  let cashFlowName = '';
  let cashFlowValue: number;
  let cashFlowType: TransactionType = 'INCOME';


  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cash-flow`, {
        name: cashFlowName,
        value: cashFlowValue,
        description: 'asdas',
        type: cashFlowType,
      });

      if (cashFlowType === 'INCOME') {
        financialSummary = {
          ...financialSummary,
          income: financialSummary.income + cashFlowValue,
          profit: financialSummary.profit + cashFlowValue,
          cashFlowList: [...financialSummary.cashFlowList, data],
        };
      }
      if (cashFlowType === 'EXPENSE') {
        financialSummary = {
          ...financialSummary,
          expense: financialSummary.expense + cashFlowValue,
          profit: financialSummary.profit - cashFlowValue,
          cashFlowList: [...financialSummary.cashFlowList, data],
        };
      }


      cashFlowList = [...cashFlowList, data];
      loading = false
    } catch (err) {
      console.log(err);
    }
    showModal = false
  }

  onMount(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/financial-summary`);
      financialSummary = data;
      cashFlowList = data.cashFlowList;
      loading = false
    } catch (err) {
      console.log(err);
    }
  });

</script>

{#if loading}
  <div></div>
{:else}
  <div class="h-screen">
    <Modal bind:showModal on:click handleSubmit={handleSubmit}>
      <div class="w-full h-full">
        <p class="text-2xl mb-6">Criando novo Fluxo</p>
        <div class="flex flex-col gap-8" >
          <div class="flex justify-between">
            <p class="font-semibold text-xl">Nome:</p>
            <input
              bind:value={cashFlowName}
              type="text"
              class="border-[1px] rounded border-gray-500 p-1 font-lg outline-0 active:border-primary"
            />
          </div>
          <div class="flex justify-between">
            <p class="font-semibold text-xl">Valor:</p>
            <input
              bind:value={cashFlowValue}
              type="number"
              class="border-[1px] rounded border-gray-500 p-1 font-lg outline-0 active:border-primary"
            />
          </div>
          <div class="flex justify-between">
            <p class="font-semibold text-xl">Tipo:</p>
            <select
              bind:value={cashFlowType}
              class="border-[1px] rounded border-gray-500 p-1 font-lg outline-0 active:border-primary"
            >
              <option value="INCOME">Entrada</option>
              <option value="EXPENSE">Gasto</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
    <div class="flex justify-around items-center">
      <h1 class="my-12 text-white">Cash tracker</h1>
      <button on:click={() => showModal = true} class="trasition backdrop-brightness-125 p-4 rounded-md text-white hover:backdrop-brightness-50">Adicionar fluxo</button>
    </div>
    <div class=" flex justify-between mx-auto -mb-12 max-w-screen-xl px-4 gap-8 overflow-x-scroll scroll-auto snap-x">
      <div class="p-8 text-xl grid gap-4 bg-gray-100 text-2xl w-72 xl:w-96 rounded-xl min-w-72">
        <div class="flex justify-between snap-center">
          <p>Entradas</p>
          <ArrowUp height={32} width={32} stroke="#81D15A" />
        </div>
        <p class="text-4xl font-semibold">
          {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(financialSummary.income)}
        </p>
      </div>
      <div class="p-8 text-xl grid gap-4 bg-gray-100 text-2xl w-72 xl:w-96 rounded-xl min-w-72 snap-center">
        <div class="flex justify-between">
          <p>Saídas</p>
          <ArrowDown height={32} width={32} stroke="#ef4444" />
        </div>
        <p class="text-4xl font-semibold">- 
          {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(financialSummary.expense)}
        </p>
      </div>
      <div class="p-8 text-xl grid gap-4 bg-[#81D15A] text-white text-2xl w-72 xl:w-96 rounded-xl min-w-72 snap-center">
        <div class="flex justify-between">
          <p>total</p>
          <p>$</p>
        </div>
        <p class="text-4xl font-semibold">
          {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(financialSummary.profit)}
        </p>
      </div>
    </div>
    <div class="min-h-full bg-white rounded-t-[40px] pt-24 flex flex-col ">
      <div class="flex flex-col gap-8 px-2 md:px-0 md:max-w-screen-md md:mx-auto md:w-4/5 ">
        {#each cashFlowList as cashFlow }
          <CashFlowCard type={cashFlow.type} title={cashFlow.name} value={cashFlow.value} />
        {/each }
      </div>
    </div>
  </div>
{/if}
