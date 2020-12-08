<script lang="ts">
    export let data;

    import { NEW_CONFIRMED_CASES } from "./constants";
    import { DataService } from "./services/dataService";

    $: getTodayCount = () => {
        let todayCount: number = 0;
        if (data.length > 0) {
            todayCount = parseInt(data[data.length - 1][NEW_CONFIRMED_CASES]);
        }
        return todayCount;
    };
</script>

<div class="count count--today">
    <h1 class="count__title">New cases today</h1>
    <p class="count__count">{getTodayCount().toLocaleString()}</p>
    <h2 class="count__subtitle">
        Highest day:
        {DataService.getHighestDayCount(data).toLocaleString()}
    </h2>
</div>
