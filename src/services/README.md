# Services
Services are listening to state changes. When the state is matching the defined criteria, it will execute.

## Examples
Current state is:
```
{
  state: {
    name: null,
    page: 'home'
  }
}
```
When executing the event: `EVENT.SAVE`, with params:
```
{
  name: 'EnoF'
}
```
The service `Home.saveName` will be called to result in the following state:
```
{
  state: {
    name: 'EnoF'
  }
}
```
