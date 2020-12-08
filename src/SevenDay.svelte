<script lang="ts">
    export let data;

    import { NEW_CONFIRMED_CASES } from "./constants";

    $: getSevenDayAverage = (start: number, end: number) => {
        let sevenDayAverage: number = 0;
        if (data.length > 0) {
            for (let i = start; i <= end; i++) {
                sevenDayAverage += parseInt(
                    data[data.length - i][NEW_CONFIRMED_CASES],
                    10
                );
            }
        }
        return Math.round(sevenDayAverage / 7);
    };
</script>

<div class="count count--sevenDay">
    <h1 class="count__title">7 day average</h1>
    <p class="count__count">{getSevenDayAverage(1, 7).toLocaleString()}</p>
    <p class="count__subtitle">
        Previous Period:
        {getSevenDayAverage(8, 14).toLocaleString()}
    </p>
</div>
