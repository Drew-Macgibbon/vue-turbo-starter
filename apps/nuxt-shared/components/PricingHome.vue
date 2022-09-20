
<template>
  <Section :bg-color="'none'"
    class="pt4 pb4">
    <template #default>
      <div class="grid col2 gap4">
        <div class="pricing-feat-wrap flex-col h-center gap1">
          <div class="pricing-feat">
            <h5> Unlimited access for 2 months ($138 value) </h5>
            <p>
              Get full access to MLFX! The algorithm, signals, trading journal and other premium features. <strong>
                Provide value to continue your free access. </strong>
            </p>
          </div>
          <div class="pricing-feat">
            <h5> Guaranteed algorithm access </h5>
            <p>
              MLFX spots are extremely limited. Guarantee your future position, join our community in
              less than a minute, <strong> don't miss out! </strong>
            </p>
          </div>
          <div class="pricing-feat">
            <h5>Help us help you</h5>
            <p>
              Every early adopter provides us with invaluable data which helps improve MLFX. If you want to see MLFX
              succeed, become a paying customer, <strong> we reinvest our profits. </strong>
            </p>
          </div>
          <h6 class="green-text">MLFX is designed for desktop/laptop use</h6>
        </div>
        <PricingGrid :show="1" />
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">

</script>
